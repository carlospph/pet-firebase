import { db } from './firebase-init.js';
import { 
    collection, 
    addDoc, 
    getDocs, 
    doc, 
    updateDoc, 
    deleteDoc, 
    query, 
    where 
} from 'https://www.gstatic.com/firebasejs/12.8.0/firebase-firestore.js';

document.addEventListener('DOMContentLoaded', () => {
    const agendamentoForm = document.getElementById('agendamento-form');
    const consultasList = document.getElementById('consultas-list');
    const consultaIdField = document.getElementById('consultaId');
    const cancelUpdateBtn = document.getElementById('cancel-update-btn');

    // Função para carregar e exibir as consultas agendadas
    async function loadConsultas() {
        consultasList.innerHTML = ''; // Limpa a lista
        try {
            const querySnapshot = await getDocs(collection(db, 'consultas'));
            querySnapshot.forEach((document) => {
                const consulta = document.data();
                const consultaId = document.id;

                const listItem = document.createElement('li');
                listItem.innerHTML = `
                    <span>${new Date(consulta.data + 'T' + consulta.horario).toLocaleString('pt-BR')} - Dr(a). ${consulta.medico}</span>
                    <div>
                        <button data-id="${consultaId}" class="update-btn">Editar</button>
                        <button data-id="${consultaId}" class="delete-btn">Cancelar</button>
                    </div>
                `;
                consultasList.appendChild(listItem);
            });
        } catch (error) {
            console.error("Erro ao carregar consultas: ", error);
        }
    }

    // Função para verificar se já existe uma consulta no mesmo horário
    async function isHorarioOcupado(data, horario, excludeId = null) {
        const q = query(collection(db, "consultas"), where("data", "==", data), where("horario", "==", horario));
        const querySnapshot = await getDocs(q);
        let isOcupado = false;
        querySnapshot.forEach((doc) => {
            if (doc.id !== excludeId) {
                isOcupado = true;
            }
        });
        return isOcupado;
    }

    // Adicionar ou Atualizar uma consulta
    agendamentoForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const data = agendamentoForm.data.value;
        const horario = agendamentoForm.horario.value;
        const medico = agendamentoForm.medico.value;
        const sintomas = agendamentoForm.sintomas.value;
        const consultaId = consultaIdField.value;

        const ocupado = await isHorarioOcupado(data, horario, consultaId);
        if (ocupado) {
            alert('Este horário já está agendado. Por favor, escolha outro.');
            return;
        }

        try {
            if (consultaId) {
                // Atualizar consulta existente
                const consultaRef = doc(db, 'consultas', consultaId);
                await updateDoc(consultaRef, { data, horario, medico, sintomas });
                alert('Consulta atualizada com sucesso!');
            } else {
                // Adicionar nova consulta
                await addDoc(collection(db, 'consultas'), { data, horario, medico, sintomas });
                alert('Consulta agendada com sucesso!');
            }
            agendamentoForm.reset();
            consultaIdField.value = '';
            cancelUpdateBtn.classList.add('hidden');
            loadConsultas();
        } catch (error) {
            console.error("Erro ao salvar agendamento: ", error);
        }
    });

    // Cancelar/Atualizar e Excluir consulta
    consultasList.addEventListener('click', async (e) => {
        const target = e.target;
        const consultaId = target.getAttribute('data-id');

        if (target.classList.contains('delete-btn')) {
            if (confirm('Tem certeza que deseja cancelar esta consulta?')) {
                try {
                    await deleteDoc(doc(db, 'consultas', consultaId));
                    loadConsultas();
                } catch (error) {
                    console.error("Erro ao cancelar consulta: ", error);
                }
            }
        } else if (target.classList.contains('update-btn')) {
            const consultaRef = doc(db, 'consultas', consultaId);
            const docSnap = await getDoc(consultaRef);
            if (docSnap.exists()) {
                const data = docSnap.data();
                agendamentoForm.data.value = data.data;
                agendamentoForm.horario.value = data.horario;
                agendamentoForm.medico.value = data.medico;
                agendamentoForm.sintomas.value = data.sintomas;
                consultaIdField.value = consultaId;
                cancelUpdateBtn.classList.remove('hidden');
                window.scrollTo(0, 0); // Rola para o topo para editar
            }
        }
    });

    // Botão para cancelar a atualização
    cancelUpdateBtn.addEventListener('click', () => {
        agendamentoForm.reset();
        consultaIdField.value = '';
        cancelUpdateBtn.classList.add('hidden');
    });

    // Carrega as consultas ao carregar a página
    loadConsultas();
});