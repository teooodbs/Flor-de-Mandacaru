import { catalogoCompleto } from "../data/itensLoja.js";

const NOME_CHAVE_CARRINHO = 'carrinho-flor-de-mandacaru';


export function lerCarrinho() {
  const carrinhoString = localStorage.getItem(NOME_CHAVE_CARRINHO);
  return JSON.parse(carrinhoString) || [];
}


function salvarCarrinho(carrinho) {
  localStorage.setItem(NOME_CHAVE_CARRINHO, JSON.stringify(carrinho));
}


export function adicionarAoCarrinho(idDoItem) {
  const carrinho = lerCarrinho();
  const itemNoCarrinho = carrinho.find(item => item.id === idDoItem);

  if (itemNoCarrinho) {
    itemNoCarrinho.quantidade++;
  } else {
    const itemDoCatalogo = catalogoCompleto.find(item => item.id === idDoItem);
    if (itemDoCatalogo) {
      carrinho.push({ ...itemDoCatalogo, quantidade: 1 });
    }
  }

  salvarCarrinho(carrinho);
}


export function removerDoCarrinho(idDoItem) {
  const carrinho = lerCarrinho();

  const novoCarrinho = carrinho.filter(item => item.id !== idDoItem);
  salvarCarrinho(novoCarrinho); 
}
