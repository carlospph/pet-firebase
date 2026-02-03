import { db } from './firebase-init.js';
import { collection, addDoc } from 'https://www.gstatic.com/firebasejs/12.8.0/firebase-firestore.js';

document.addEventListener('DOMContentLoaded', () => {
    const addPostForm = document.getElementById('add-post-form');

    addPostForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = new FormData(addPostForm);
        const titulo = formData.get('titulo');
        const categoria = formData.get('categoria');
        const resumo = formData.get('resumo');
        const imagem = formData.get('imagem');

        try {
            await addDoc(collection(db, 'posts'), {
                titulo,
                categoria,
                resumo,
                imagem,
                createdAt: new Date() // Adiciona um timestamp de criação
            });

            // Exibe mensagem de sucesso
            alert('Post cadastrado com sucesso!');

            // Redireciona para a página inicial
            window.location.href = 'index.html';

        } catch (error) {
            console.error("Erro ao adicionar post: ", error);
            alert('Ocorreu um erro ao salvar o post. Tente novamente.');
        }
    });
});