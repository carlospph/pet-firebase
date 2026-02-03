import { db } from './firebase-init.js';
import { collection, addDoc, getDocs, doc, deleteDoc } from 'https://www.gstatic.com/firebasejs/12.8.0/firebase-firestore.js';

document.addEventListener('DOMContentLoaded', () => {
    const addPetForm = document.getElementById('add-pet-form');
    const petList = document.getElementById('pet-list');

    // Função para carregar e exibir a lista de pets cadastrados
    async function loadPets() {
        petList.innerHTML = ''; // Limpa a lista
        try {
            const querySnapshot = await getDocs(collection(db, 'pets'));
            querySnapshot.forEach((document) => {
                const pet = document.data();
                const petId = document.id;

                const listItem = document.createElement('li');
                listItem.innerHTML = `
                    <span>${pet.nome} - ${pet.raca}</span>
                    <button data-id="${petId}" class="delete-btn">Excluir</button>
                `;
                petList.appendChild(listItem);
            });
        } catch (error) {
            console.error("Erro ao carregar pets: ", error);
        }
    }

    // Adicionar um novo pet
    addPetForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const nome = addPetForm.nome.value;
        const raca = addPetForm.raca.value;
        const idade = addPetForm.idade.value;
        const categoria = addPetForm.categoria.value;
        const imageUrl = addPetForm.imageUrl.value;

        try {
            await addDoc(collection(db, 'pets'), {
                nome,
                raca,
                idade,
                categoria,
                imageUrl
            });
            addPetForm.reset();
            loadPets(); // Recarrega a lista após adicionar
        } catch (error) {
            console.error("Erro ao adicionar pet: ", error);
        }
    });

    // Excluir um pet (usando delegação de evento)
    petList.addEventListener('click', async (e) => {
        if (e.target && e.target.classList.contains('delete-btn')) {
            const petId = e.target.getAttribute('data-id');
            if (confirm('Tem certeza que deseja excluir este pet?')) {
                try {
                    await deleteDoc(doc(db, 'pets', petId));
                    loadPets(); // Recarrega a lista após excluir
                } catch (error) {
                    console.error("Erro ao excluir pet: ", error);
                }
            }
        }
    });

    // Carrega a lista de pets ao carregar a página
    loadPets();
});