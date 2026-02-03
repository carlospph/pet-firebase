import { db } from './firebase-init.js';
import { collection, getDocs, query } from 'https://www.gstatic.com/firebasejs/12.8.0/firebase-firestore.js';

document.addEventListener('DOMContentLoaded', () => {
    const feed = document.getElementById('feed');
    const searchInput = document.getElementById('search-input');

    // Função para criar o card de um post
    function createPostCard(post) {
        const card = document.createElement('div');
        card.className = 'card';

        const img = document.createElement('img');
        img.src = post.imagem;
        img.alt = post.titulo;

        const title = document.createElement('h2');
        title.textContent = post.titulo;

        const summary = document.createElement('p');
        summary.textContent = post.resumo;

        const category = document.createElement('p');
        category.innerHTML = `<strong>Categoria:</strong> ${post.categoria}`;

        card.appendChild(img);
        card.appendChild(title);
        card.appendChild(summary);
        card.appendChild(category);

        return card;
    }

    // Função para buscar e exibir os posts
    async function fetchPosts(searchTerm = '') {
        feed.innerHTML = ''; // Limpa o feed antes de carregar novos posts
        try {
            const postsCollection = collection(db, 'posts');
            const querySnapshot = await getDocs(postsCollection);
            let posts = [];
            querySnapshot.forEach((doc) => {
                posts.push(doc.data());
            });

            // Filtra no lado do cliente
            if (searchTerm) {
                const lowerCaseSearchTerm = searchTerm.toLowerCase();
                posts = posts.filter(post => 
                    post.titulo.toLowerCase().includes(lowerCaseSearchTerm) ||
                    post.categoria.toLowerCase().includes(lowerCaseSearchTerm)
                );
            }

            if (posts.length === 0) {
                feed.innerHTML = '<p>Nenhum post encontrado. Tente uma busca diferente!</p>';
            }

            posts.forEach(post => {
                const postCard = createPostCard(post);
                feed.appendChild(postCard);
            });

        } catch (error) {
            console.error("Erro ao buscar posts: ", error);
            feed.innerHTML = '<p>Ocorreu um erro ao carregar os posts. Tente novamente mais tarde.</p>';
        }
    }

    // Event listener para a barra de busca
    searchInput.addEventListener('input', (e) => {
        fetchPosts(e.target.value);
    });

    // Carrega todos os posts inicialmente
    fetchPosts();
});