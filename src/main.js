
// Importa o CSS
import './style.css';

// Importa o array com produtos
import { catalogoCompleto } from './data/itensLoja.js';

// Importa a função que cria o HTML de um card de item
import { criarCardItemElemento } from './components/CardItem.js';




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
});