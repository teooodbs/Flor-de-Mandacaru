
import { adicionarAoCarrinho } from '../utils/carrinho.js';
import { renderizarCarrinho, abrirCarrinho } from '../main.js';


export function criarCardItemElemento(item) {
  const card = document.createElement('div');
  card.className = 'card-item';
  card.setAttribute('data-item-id', item.id);

  const precoFormatado = item.preco.toFixed(2).replace('.', ',');

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


  const btnAdicionar = card.querySelector('.btn-adicionar');


  btnAdicionar.addEventListener('click', () => {

    adicionarAoCarrinho(item.id);

    renderizarCarrinho();

    abrirCarrinho();
  });

  const btnDetalhes = card.querySelector('.btn-detalhes');
  btnDetalhes.addEventListener('click', () => {
    console.log(`Ver detalhes de: ${item.nome}`);
    // Futuramente, aqui podemos abrir um pop-up (modal)
  });

  return card;
}