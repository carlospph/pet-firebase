import { db } from './firebase-init.js';
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/12.8.0/firebase-firestore.js";

document.addEventListener('DOMContentLoaded', () => {
    const feed = document.getElementById("feed-pet");
    const searchInput = document.getElementById('search-input');

    let allPosts = []; // Cache para os posts

    // Função para renderizar os posts na tela
    function renderPosts(posts) {
        feed.innerHTML = ''; // Limpa o feed
        if (posts.length === 0) {
            feed.innerHTML = '<p>Nenhum post encontrado.</p>';
            return;
        }

        posts.forEach(post => {
            const postElement = document.createElement('article');
            postElement.className = 'card';
            postElement.innerHTML = `
                <img src="${post.imagem || 'https://via.placeholder.com/300'}" alt="Foto do Pet">
                <div class="content">
                  <span class="category">${post.categoria}</span>
                  <h2>${post.titulo}</h2>
                  <p>${post.resumo}</p>
                </div>
            `;
            feed.appendChild(postElement);
        });
    }

    // Função para carregar os posts do Firestore
    async function carregarPosts() {
        try {
            const querySnapshot = await getDocs(collection(db, "posts"));
            allPosts = querySnapshot.docs.map(doc => doc.data());
            renderPosts(allPosts);
        } catch (error) {
            console.error("Erro ao carregar posts:", error);
            feed.innerHTML = '<p>Erro ao carregar os posts. Verifique o console para mais detalhes.</p>';
        }
    }

    // Função para filtrar os posts com base na busca
    function filtrarPosts() {
        const termo = searchInput.value.toLowerCase();
        const postsFiltrados = allPosts.filter(post => 
            post.titulo.toLowerCase().includes(termo) || 
            post.categoria.toLowerCase().includes(termo)
        );
        renderPosts(postsFiltrados);
    }

    // Adiciona os listeners de eventos
    if (searchInput) {
        searchInput.addEventListener('input', filtrarPosts);
    }

    // Carrega os posts iniciais
    carregarPosts();
});
