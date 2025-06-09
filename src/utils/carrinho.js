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
// Adicione esta função ao final de src/utils/cart.js

/**
 * Remove um item do carrinho baseado no seu ID.
 * @param {string} idDoItem - O ID do item a ser removido.
 */
export function removerDoCarrinho(idDoItem) {
  const carrinho = lerCarrinho();
  // O .filter() cria um novo array com todos os itens que passam no teste.
  // O teste é: o ID do item é DIFERENTE do ID que queremos remover?
  const novoCarrinho = carrinho.filter(item => item.id !== idDoItem);
  salvarCarrinho(novoCarrinho); // Salva o novo carrinho sem o item removido.
}