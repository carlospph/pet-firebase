# Blueprint: Blog de Pets

## Visão Geral

Este projeto é um blog de pets simples, construído com HTML, CSS e JavaScript, e integrado com o Firebase para armazenamento e gerenciamento de dados. O objetivo é fornecer uma plataforma para compartilhar dicas e cuidados sobre animais de estimação, além de permitir o agendamento de consultas veterinárias.

## Funcionalidades

- **Feed de Posts:** A página inicial exibe todos os posts do blog em um layout de cards.
- **Busca de Posts:** Os usuários podem buscar por posts por título ou categoria.
- **Painel Administrativo:** Uma página de administração permite adicionar e excluir posts.
- **Agendamento de Consultas:** Uma página dedicada permite que os usuários agendem, visualizem, atualizem e cancelem consultas para seus pets.
- **Armazenamento no Firebase:** Os posts do blog são armazenados na coleção `posts` do Cloud Firestore, e as consultas na coleção `consultas`.

## Estrutura do Projeto

- `index.html`: A página principal do blog.
- `style.css`: A folha de estilos para o projeto.
- `main.js`: O script principal para a página inicial, que busca e exibe os posts.
- `admin.html`: A página de administração para gerenciar os posts.
- `admin.js`: O script para a página de administração.
- `consulta.html`: A página para agendamento de consultas.
- `consulta.js`: O script para a funcionalidade de agendamento de consultas.
- `firebase-init.js`: O script de inicialização do Firebase.
- `firestore.rules`: As regras de segurança do Firestore.
- `blueprint.md`: Este documento.

## Design e Estilo

- **Layout:** O layout é simples e limpo, com um cabeçalho, um feed principal e um rodapé.
- **Cards de Posts:** Cada post é exibido em um card com uma imagem, título, resumo e categoria.
- **Formulários:** Os formulários de adição de posts e agendamento de consultas são intuitivos e fáceis de usar.
- **Cores:** A paleta de cores é neutra e agradável, com tons de cinza, branco e um toque de cor para os detalhes.
- **Fontes:** As fontes são legíveis e modernas.

## Plano de Alterações Atuais

- **Adição da Funcionalidade de Agendamento de Consultas:**
    - Criação da página `consulta.html` com o formulário de agendamento e a lista de consultas.
    - Criação do script `consulta.js` para gerenciar a lógica de agendamento, incluindo a verificação de horários, adição, atualização e exclusão de consultas no Firestore.
    - Adição de um link para a página de agendamento na barra de navegação.
    - Atualização do `style.css` para estilizar a nova página.
    - Atualização deste `blueprint.md`.
