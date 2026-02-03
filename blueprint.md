# Blueprint: Blog de Pets

## Visão Geral

Este projeto é um blog de pets simples, construído com HTML, CSS e JavaScript, e integrado com o Firebase para armazenamento e gerenciamento de dados. O objetivo é fornecer uma plataforma para compartilhar dicas e cuidados sobre animais de estimação.

## Funcionalidades

- **Feed de Posts:** A página inicial exibe todos os posts do blog em um layout de cards.
- **Busca de Posts:** Os usuários podem buscar por posts por título ou categoria.
- **Painel Administrativo:** Uma página de administração permite adicionar e excluir posts.
- **Armazenamento no Firebase:** Os posts do blog são armazenados na coleção `posts` do Cloud Firestore.

## Estrutura do Projeto

- `index.html`: A página principal do blog.
- `style.css`: A folha de estilos para o projeto.
- `main.js`: O script principal para a página inicial, que busca e exibe os posts.
- `admin.html`: A página de administração para gerenciar os posts.
- `admin.js`: O script para a página de administração.
- `firebase-init.js`: O script de inicialização do Firebase.
- `firestore.rules`: As regras de segurança do Firestore.
- `blueprint.md`: Este documento.

## Design e Estilo

- **Layout:** O layout é simples e limpo, com um cabeçalho, um feed principal e um rodapé.
- **Cards de Posts:** Cada post é exibido em um card com uma imagem, título, resumo e categoria.
- **Cores:** A paleta de cores é neutra e agradável, com tons de cinza, branco e um toque de cor para os detalhes.
- **Fontes:** As fontes são legíveis e modernas.

## Plano de Alterações Recentes

- **Transformação do Projeto:** O projeto foi transformado de um site de adoção de pets para um blog de pets.
- **Correção da Coleção:** O nome da coleção no Firestore foi corrigido de `pets` para `posts` em todos os arquivos.
- **Atualização do Conteúdo:** O conteúdo HTML e a lógica JavaScript foram atualizados para refletir a nova funcionalidade de blog.
- **Atualização das Regras de Segurança:** As regras de segurança do Firestore foram atualizadas para permitir a leitura e escrita na coleção `posts`.
- **Criação do Blueprint:** Este documento foi criado para documentar o projeto.
