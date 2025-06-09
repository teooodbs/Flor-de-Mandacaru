// src/components/CardItem.js

// --- IMPORTS ---
// Importa a lógica de adicionar ao carrinho (do nosso "cérebro" do carrinho)
import { adicionarAoCarrinho } from '../utils/carrinho.js';
// Importa as funções de UI do main.js para atualizar e mostrar a sidebar
import { renderizarCarrinho, abrirCarrinho } from '../main.js';


export function criarCardItemElemento(item) {
  // 1. Cria o elemento <div> principal do card
  const card = document.createElement('div');
  card.className = 'card-item';
  card.setAttribute('data-item-id', item.id);

  // 2. Formata o preço
  const precoFormatado = item.preco.toFixed(2).replace('.', ',');

  // 3. Monta a estrutura HTML interna do card
  card.innerHTML = `
    <img src="${item.imagemURL}" alt="Imagem de ${item.nome}" class="imagem-item">
    <h3>${item.nome}</h3>
    <p class="descricao-item">${item.descricao}</p>
    <p class="preco-item">R$ ${precoFormatado}</p>
    <div class="botoes-card">
      <button class="btn-adicionar" data-id="${item.id}">Adicionar ao Carrinho</button>
      <button class="btn-detalhes" data-id="${item.id}">Ver Detalhes</button>
    </div>
  `;

  // --- EVENT LISTENERS ---
  const btnAdicionar = card.querySelector('.btn-adicionar');

  // AQUI ESTÁ A MÁGICA:
  btnAdicionar.addEventListener('click', () => {
    // 1. Adiciona o item à "memória" do carrinho (localStorage)
    adicionarAoCarrinho(item.id);

    // 2. Atualiza a aparência da sidebar para mostrar o novo item
    renderizarCarrinho();

    // 3. Abre a sidebar para o usuário ver que o item foi adicionado
    abrirCarrinho();
  });

  const btnDetalhes = card.querySelector('.btn-detalhes');
  btnDetalhes.addEventListener('click', () => {
    console.log(`Ver detalhes de: ${item.nome}`);
    // Futuramente, aqui podemos abrir um pop-up (modal)
  });

  // 5. Retorna o card prontinho para ser usado pelo main.js
  return card;
}