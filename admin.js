import { db } from './firebase-init.js';
import { collection, addDoc, getDocs, doc, deleteDoc } from 'https://www.gstatic.com/firebasejs/12.8.0/firebase-firestore.js';

document.addEventListener('DOMContentLoaded', () => {
    const addPostForm = document.getElementById('add-post-form');
    const postList = document.getElementById('post-list');

    // Função para carregar e exibir a lista de posts cadastrados
    async function loadPosts() {
        postList.innerHTML = ''; // Limpa a lista
        try {
            const querySnapshot = await getDocs(collection(db, 'posts'));
            querySnapshot.forEach((document) => {
                const post = document.data();
                const postId = document.id;

                const listItem = document.createElement('li');
                listItem.innerHTML = `
                    <span>${post.titulo} - ${post.categoria}</span>
                    <button data-id="${postId}" class="delete-btn">Excluir</button>
                `;
                postList.appendChild(listItem);
            });
        } catch (error) {
            console.error("Erro ao carregar posts: ", error);
        }
    }

    // Adicionar um novo post
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
                imagem
            });
            addPostForm.reset();
            loadPosts(); // Recarrerega a lista após adicionar
        } catch (error) {
            console.error("Erro ao adicionar post: ", error);
        }
    });

    // Excluir um post (usando delegação de evento)
    postList.addEventListener('click', async (e) => {
        if (e.target && e.target.classList.contains('delete-btn')) {
            const postId = e.target.getAttribute('data-id');
            if (confirm('Tem certeza que deseja excluir este post?')) {
                try {
                    await deleteDoc(doc(db, 'posts', postId));
                    loadPosts(); // Recarrega a lista após excluir
                } catch (error) {
                    console.error("Erro ao excluir post: ", error);
                }
            }
        }
    });

    // Carrega a lista de posts ao carregar a página
    loadPosts();
});