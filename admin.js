import { db } from './firebase-init.js';
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/12.8.0/firebase-firestore.js";

document.addEventListener('DOMContentLoaded', () => {
    const postForm = document.getElementById('post-form');

    // Função para adicionar um novo post
    async function adicionarPost(event) {
        event.preventDefault();
        const titulo = document.getElementById('titulo').value;
        const categoria = document.getElementById('categoria').value;
        const imagem = document.getElementById('imagem').value;
        const resumo = document.getElementById('resumo').value;

        try {
            const docRef = await addDoc(collection(db, "posts"), {
                titulo: titulo,
                categoria: categoria,
                imagem: imagem,
                resumo: resumo,
                timestamp: new Date()
            });
            console.log("Post adicionado com ID: ", docRef.id);
            postForm.reset();
            // Opcional: Redirecionar para a página inicial ou mostrar uma mensagem de sucesso.
            alert('Post publicado com sucesso!');
            window.location.href = 'index.html'; // Redireciona para o blog após a publicação
        } catch (error) {
            console.error("Erro ao adicionar post:", error);
            alert('Ocorreu um erro ao publicar o post. Verifique o console.');
        }
    }

    if (postForm) {
        postForm.addEventListener('submit', adicionarPost);
    }
});
