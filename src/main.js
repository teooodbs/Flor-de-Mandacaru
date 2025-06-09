
// src/main.js

// ==========================================================
// 1. IMPORTAÇÕES
// ==========================================================
// Importa o CSS principal para o Vite aplicar à página.
import './style.css';
// Importa o catálogo de produtos do nosso arquivo de dados.
import { catalogoCompleto } from './data/itensLoja.js';
// Importa a função que sabe como criar o HTML de um card de produto.
import { criarCardItemElemento } from './components/CardItem.js';
// Importa a função que sabe como ler os dados do carrinho no localStorage.
import { lerCarrinho } from './utils/carrinho.js';


// ==========================================================
// 2. FUNÇÕES PRINCIPAIS
// ==========================================================

/**
 * Renderiza uma seção específica de produtos na página.
 * (Esta função não precisa de 'export' pois só é usada aqui dentro do main.js)
 */
function renderizarSecoesDeProdutos() {
  // Filtra e renderiza cada categoria no seu respectivo container
  const flores = catalogoCompleto.filter(item => item.categoria === 'Flores');
  const cestas = catalogoCompleto.filter(item => item.categoria === 'Cestas de Presente');
  const buques = catalogoCompleto.filter(item => item.categoria === 'Buquês');

  flores.forEach(item => {
    document.getElementById('lista-flores').appendChild(criarCardItemElemento(item));
  });
  cestas.forEach(item => {
    document.getElementById('lista-cestas').appendChild(criarCardItemElemento(item));
  });
  buques.forEach(item => {
    document.getElementById('lista-buques').appendChild(criarCardItemElemento(item));
  });
}

/**
 * ATUALIZADA: Renderiza os itens do carrinho na sidebar, calcula o total
 * e atualiza o contador no header.
 * (Esta função PRECISA de 'export' para ser usada pelo CardItem.js)
 */
export function renderizarCarrinho() {
  const carrinho = lerCarrinho();
  const containerItens = document.getElementById('itens-do-carrinho-container');
  const containerTotal = document.getElementById('total-carrinho');
  const contadorHeader = document.getElementById('contador-carrinho');

  containerItens.innerHTML = ''; // Limpa antes de renderizar

  if (carrinho.length === 0) {
    containerItens.innerHTML = '<p>Seu carrinho está vazio.</p>';
    containerTotal.innerHTML = '';
    contadorHeader.innerText = '0';
    return;
  }

  // Calcula e exibe o preço total com .reduce()
  const precoTotal = carrinho.reduce((total, item) => total + item.preco * item.quantidade, 0);
  containerTotal.innerHTML = `Total: R$ ${precoTotal.toFixed(2).replace('.', ',')}`;

  // Calcula e exibe a quantidade total de itens no header com .reduce()
  const quantidadeTotal = carrinho.reduce((total, item) => total + item.quantidade, 0);
  contadorHeader.innerText = quantidadeTotal;

  // Cria o HTML para cada item do carrinho
  carrinho.forEach(item => {
    const elementoItem = document.createElement('div');
    elementoItem.classList.add('item-no-carrinho');
    elementoItem.innerHTML = `
      <img src="${item.imagemURL}" alt="${item.nome}">
      <span>${item.nome}</span>
      <span>Qtd: ${item.quantidade}</span>
      <span>R$ ${(item.preco * item.quantidade).toFixed(2).replace('.', ',')}</span>
      <button class="btn-remover-item" data-id="${item.id}">Remover</button>
    `;
    containerItens.appendChild(elementoItem);
  });
}

/**
 * Abre a sidebar do carrinho.
 * (Esta função PRECISA de 'export' para ser usada pelo CardItem.js)
 */
export function abrirCarrinho() {
  document.getElementById('sidebar-carrinho').classList.add('aberto');
  document.getElementById('overlay-carrinho').classList.add('visivel');
}

/**
 * Fecha a sidebar do carrinho.
 * (Não precisa de 'export', só é usada aqui)
 */
function fecharCarrinho() {
  document.getElementById('sidebar-carrinho').classList.remove('aberto');
  document.getElementById('overlay-carrinho').classList.remove('visivel');
}


// ==========================================================
// 3. PONTO DE ENTRADA DA APLICAÇÃO
// ==========================================================

// Quando o HTML da página estiver pronto, o código abaixo será executado.
document.addEventListener('DOMContentLoaded', () => {
  // --- Seleciona os elementos da sidebar ---
  const btnAbrirCarrinho = document.getElementById('btn-abrir-carrinho');
  const btnFecharCarrinho = document.getElementById('btn-fechar-carrinho');
  const overlay = document.getElementById('overlay-carrinho');

  // --- Adiciona os eventos de abrir e fechar ---
  btnAbrirCarrinho.addEventListener('click', abrirCarrinho);
  btnFecharCarrinho.addEventListener('click', fecharCarrinho);
  overlay.addEventListener('click', fecharCarrinho);

  // --- Renderiza o conteúdo inicial da página ---
  renderizarSecoesDeProdutos();
  renderizarCarrinho(); // Renderiza o carrinho para mostrar o estado inicial (vazio ou não)
});