
// ==========================================================
// IMPORTAÇÕES
// ==========================================================
// Importa CSS
import './style.css';
// Importa o catálogo de produtos do nosso arquivo de dados.
import { catalogoCompleto } from './data/itensLoja.js';
// Importa a função que sabe como criar o HTML de um card de produto.
import { criarCardItemElemento } from './components/CardItem.js';
// Importa as funções de lógica do carrinho que interagem com o localStorage.
import { lerCarrinho, removerDoCarrinho } from './utils/carrinho.js';




function renderizarSecoesDeProdutos() {
  // Filtra os produtos por categoria
  const flores = catalogoCompleto.filter(item => item.categoria === 'Flores');
  const cestas = catalogoCompleto.filter(item => item.categoria === 'Cestas de Presente');
  const buques = catalogoCompleto.filter(item => item.categoria === 'Buquês');

  // Pega os containers do HTML
  const containerFlores = document.getElementById('lista-flores');
  const containerCestas = document.getElementById('lista-cestas');
  const containerBuques = document.getElementById('lista-buques');

  // Limpa os containers antes de adicionar os novos itens
  containerFlores.innerHTML = '';
  containerCestas.innerHTML = '';
  containerBuques.innerHTML = '';

  // Adiciona cada item ao seu container respectivo
  flores.forEach(item => containerFlores.appendChild(criarCardItemElemento(item)));
  cestas.forEach(item => containerCestas.appendChild(criarCardItemElemento(item)));
  buques.forEach(item => containerBuques.appendChild(criarCardItemElemento(item)));
}


export function renderizarCarrinho() {
  const carrinho = lerCarrinho();
  const containerItens = document.getElementById('itens-do-carrinho-container');
  const containerTotal = document.getElementById('total-carrinho');
  const contadorHeader = document.getElementById('contador-carrinho');

  containerItens.innerHTML = ''; // Limpa a lista de itens do carrinho

  if (carrinho.length === 0) {
    containerItens.innerHTML = '<p>Seu carrinho está vazio.</p>';
    containerTotal.innerHTML = ''; // Limpa o total
    contadorHeader.innerText = '0'; // Zera o contador do header
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
      <button class="btn-remover-item" data-id="${item.id}" title="Remover item">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18">
            <path fill="currentColor" d="M17,4H13.84A3,3,0,0,0,11.16,1H7.84A3,3,0,0,0,5.16,4H2V6H22V4ZM4.16,4A1,1,0,0,1,5.15,3H7.84a1,1,0,0,1,1-.73,1,1,0,0,1,1,.73h2.14a1,1,0,0,1,1-.73,1,1,0,0,1,1,.73h2.69a1,1,0,0,1,1,1ZM4,21a3,3,0,0,0,3,3H17a3,3,0,0,0,3-3V7H4Z"/>
        </svg>
      </button>
    `;
    containerItens.appendChild(elementoItem);
  });
}

export function abrirCarrinho() {
  document.getElementById('sidebar-carrinho').classList.add('aberto');
  document.getElementById('overlay-carrinho').classList.add('visivel');
}


function fecharCarrinho() {
  document.getElementById('sidebar-carrinho').classList.remove('aberto');
  document.getElementById('overlay-carrinho').classList.remove('visivel');
}



document.addEventListener('DOMContentLoaded', () => {
  // --- Seleciona os elementos da interface ---
  const btnAbrirCarrinho = document.getElementById('btn-abrir-carrinho');
  const btnFecharCarrinho = document.getElementById('btn-fechar-carrinho');
  const overlay = document.getElementById('overlay-carrinho');
  const containerItensCarrinho = document.getElementById('itens-do-carrinho-container');

  // --- Adiciona os eventos de abrir e fechar a sidebar ---
  btnAbrirCarrinho.addEventListener('click', abrirCarrinho);
  btnFecharCarrinho.addEventListener('click', fecharCarrinho);
  overlay.addEventListener('click', fecharCarrinho);

  // --- Adiciona o evento para REMOVER itens (Delegação de Eventos) ---
  containerItensCarrinho.addEventListener('click', (evento) => {
    const botaoRemover = evento.target.closest('.btn-remover-item');
    if (botaoRemover) {
      const idParaRemover = botaoRemover.dataset.id;
      removerDoCarrinho(idParaRemover); // Lógica de remover
      renderizarCarrinho(); // Atualiza a tela
    }
  });

  // --- Renderiza o conteúdo inicial da página ---
  renderizarSecoesDeProdutos();
  renderizarCarrinho(); // Mostra o estado inicial do carrinho
});