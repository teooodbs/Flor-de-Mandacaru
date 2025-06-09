import { catalogoCompleto } from "../data/itensLoja.js";

const NOME_CHAVE_CARRINHO = 'carrinho-flor-de-mandacaru';

/**
 * Lê o carrinho do localStorage e o retorna como um array.
 * Se não houver nada, retorna um array vazio.
 * @returns {Array<object>}
 */
export function lerCarrinho() {
  const carrinhoString = localStorage.getItem(NOME_CHAVE_CARRINHO);
  return JSON.parse(carrinhoString) || [];
}

/**
 * Salva o estado atual do carrinho no localStorage.
 * @param {Array<object>} carrinho - O array do carrinho a ser salvo.
 */
function salvarCarrinho(carrinho) {
  localStorage.setItem(NOME_CHAVE_CARRINHO, JSON.stringify(carrinho));
}

/**
 * Adiciona um item ao carrinho. Se o item já existir, incrementa a quantidade.
 * @param {string} idDoItem - O ID do item a ser adicionado.
 */
export function adicionarAoCarrinho(idDoItem) {
  const carrinho = lerCarrinho();
  const itemNoCarrinho = carrinho.find(item => item.id === idDoItem);

  if (itemNoCarrinho) {
    // Se o item já está no carrinho, apenas aumenta a quantidade
    itemNoCarrinho.quantidade++;
  } else {
    // Se for um item novo, busca no catálogo e adiciona ao carrinho
    const itemDoCatalogo = catalogoCompleto.find(item => item.id === idDoItem);
    if (itemDoCatalogo) {
      carrinho.push({ ...itemDoCatalogo, quantidade: 1 });
    }
  }

  // Salva o carrinho atualizado no localStorage
  salvarCarrinho(carrinho);
}