
// Importa o CSS
import './style.css';

// Importa o array com produtos
import { catalogoCompleto } from './data/itensLoja.js';

// Importa a função que cria o HTML de um card de item
import { criarCardItemElemento } from './components/CardItem.js';

//importando o localstorage
//import { funcao } from './services/carrinhoStorage.js';


function renderizarSecao(idContainer, categoria, catalogo) {
  // Encontra o container no HTML onde os cards serão colocados
  const container = document.getElementById(idContainer);
  if (!container) {
    console.error(`O container com o ID '${idContainer}' não foi encontrado.`);
    return;
  }

  const itensDaCategoria = catalogo.filter(item => item.categoria === categoria);
  container.innerHTML = '';
  const elementosHtml = itensDaCategoria.map(item => criarCardItemElemento(item));
  elementosHtml.forEach(card => container.appendChild(card));
}


// tratamento de Eventos
document.addEventListener('DOMContentLoaded', () => {
  console.log("Página carregada! Iniciando a renderização dos produtos...");

  // REQUISITO: Dados no LocalStorage (a completar)
  const catalogoParaRenderizar = catalogoCompleto;
  renderizarSecao('lista-flores', 'Flores', catalogoParaRenderizar);
  renderizarSecao('lista-cestas', 'Cestas de Presente', catalogoParaRenderizar);
  renderizarSecao('lista-buques', 'Buquês', catalogoParaRenderizar);

  console.log("Renderização concluída!");
  const btnAbrirCarrinho = document.getElementById('btn-abrir-carrinho');
  const btnFecharCarrinho = document.getElementById('btn-fechar-carrinho');
  const sidebar = document.getElementById('sidebar-carrinho');
  const overlay = document.getElementById('overlay-carrinho');

  function abrirCarrinho() {
    sidebar.classList.add('aberto');
    overlay.classList.add('visivel');
  }

  function fecharCarrinho() {
    sidebar.classList.remove('aberto');
    overlay.classList.remove('visivel');
  }

  // Adiciona os eventos para abrir e fechar
  btnAbrirCarrinho.addEventListener('click', abrirCarrinho);
  btnFecharCarrinho.addEventListener('click', fecharCarrinho);
  overlay.addEventListener('click', fecharCarrinho); // Fecha ao clicar fora
});