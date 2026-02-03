import { db } from './firebase-init.js';
import { collection, getDocs, query, where } from 'https://www.gstatic.com/firebasejs/12.8.0/firebase-firestore.js';

document.addEventListener('DOMContentLoaded', () => {
    const feed = document.getElementById('feed');
    const searchInput = document.getElementById('search-input');

    // Função para criar o card de um pet
    function createPetCard(pet) {
        const card = document.createElement('div');
        card.className = 'card';

        const img = document.createElement('img');
        img.src = pet.imageUrl;
        img.alt = pet.nome;

        const name = document.createElement('h2');
        name.textContent = pet.nome;

        const details = document.createElement('p');
        details.innerHTML = `<strong>Raça:</strong> ${pet.raca} | <strong>Idade:</strong> ${pet.idade} | <strong>Categoria:</strong> ${pet.categoria}`;

        card.appendChild(img);
        card.appendChild(name);
        card.appendChild(details);

        return card;
    }

    // Função para buscar e exibir os pets
    async function fetchPets(searchTerm = '') {
        feed.innerHTML = ''; // Limpa o feed antes de carregar novos pets
        try {
            const petsCollection = collection(db, 'pets');
            let petsQuery = query(petsCollection);

            // Se houver um termo de busca, adicionamos um filtro simples
            // Nota: O Firestore precisa de índices para consultas mais complexas.
            // Esta busca simples pode não pegar tudo (ex: buscar por '2 anos')
            if (searchTerm) {
                 // Para uma busca mais robusta, você precisaria de uma solução como Algolia
                 // ou dividir o termo de busca e fazer várias consultas.
                 // Por simplicidade, vamos buscar em um campo.
                 // A busca aqui será case-sensitive.
                 // petsQuery = query(petsCollection, where('raca', '>=', searchTerm), where('raca', '<=', searchTerm + '\uf8ff'));
            }
            
            const querySnapshot = await getDocs(petsQuery);
            let pets = [];
            querySnapshot.forEach((doc) => {
                pets.push(doc.data());
            });

            // Filtra no lado do cliente para uma busca mais flexível (embora menos eficiente em larga escala)
            if (searchTerm) {
                const lowerCaseSearchTerm = searchTerm.toLowerCase();
                pets = pets.filter(pet => 
                    pet.nome.toLowerCase().includes(lowerCaseSearchTerm) ||
                    pet.raca.toLowerCase().includes(lowerCaseSearchTerm) ||
                    pet.idade.toLowerCase().includes(lowerCaseSearchTerm) ||
                    pet.categoria.toLowerCase().includes(lowerCaseSearchTerm)
                );
            }

            if (pets.length === 0) {
                feed.innerHTML = '<p>Nenhum pet encontrado. Tente uma busca diferente!</p>';
            }

            pets.forEach(pet => {
                const petCard = createPetCard(pet);
                feed.appendChild(petCard);
            });

        } catch (error) {
            console.error("Erro ao buscar pets: ", error);
            feed.innerHTML = '<p>Ocorreu um erro ao carregar os pets. Tente novamente mais tarde.</p>';
        }
    }

    // Event listener para a barra de busca
    searchInput.addEventListener('input', (e) => {
        fetchPets(e.target.value);
    });

    // Carrega todos os pets inicialmente
    fetchPets();
});