const uriComentario = 'http://localhost:3000/comentario';
const dados = document.getElementById('dados');

let comentarios = [];

async function carregarTabela() {
  try {
    const response = await fetch(uriComentario);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    comentarios = await response.json();
    preencherTabela();
  } catch (error) {
    console.error('Erro dando fetch:', error);
  }
}

function preencherTabela() {
  if (!dados) {
    console.error('Tabela não encontrada');
    return;
  }

  const tableContent = comentarios.map((comentario) => {
    return `
      <tr>
        <td>${comentario.id}</td>
        <td>${comentario.os}</td>
        <td>${comentario.colaborador}</td>
        <td>${comentario.comentario}</td>
        <td>${comentario.data.split('T')[0]}</td>
      </tr>
    `;
  }).join('');

  dados.innerHTML = tableContent;
}

window.onload = carregarTabela;