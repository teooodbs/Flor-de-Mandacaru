
export function criarCardItemElemento(item) {
  // 1. Cria o elemento <div> principal do card
  const card = document.createElement('div');
  card.className = 'card-item'; // Define a classe CSS para o estilo do card
  card.setAttribute('data-item-id', item.id); // Adiciona um identificador para o item

  // 2. Formata o preço para o padrão brasileiro (ex: 60.00 -> "60,00")
  const precoFormatado = item.preco.toFixed(2).replace('.', ',');

  // 3. Monta toda a estrutura HTML interna do card
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

  // 4. Adiciona a funcionalidade (eventos) aos botões (por enquanto, só um console.log)
  //import { funcaoadcionaritem } from '../services/carrinhoStorage.js';
  const btnAdicionar = card.querySelector('.btn-adicionar');
  btnAdicionar.addEventListener('click', () => {
    console.log(`Adicionar ao carrinho: ${item.nome}`);
    // Futuramente, aqui chamaremos a função para adicionar ao carrinho
  });

  const btnDetalhes = card.querySelector('.btn-detalhes');
  btnDetalhes.addEventListener('click', () => {
    console.log(`Ver detalhes de: ${item.nome}`);
    // Futuramente, aqui podemos abrir um pop-up (modal)
  });

  // 5. Retorna o card prontinho para ser usado pelo main.js
  return card;
}