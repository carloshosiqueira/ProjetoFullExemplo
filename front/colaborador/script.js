const uriColaborador = 'http://localhost:3000/colaborador';
const dados = document.getElementById('dados');

let colaboradores = [];

async function carregarTabela() {
  try {
    const response = await fetch(uriColaborador);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    colaboradores = await response.json();
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

  const tableContent = colaboradores.map((colaborador) => {
    return `
      <tr>
        <td>${colaborador.matricula}</td>
        <td>${colaborador.nome}</td>
        <td>${colaborador.cargo}</td>
        <td>${colaborador.setor}</td>
      </tr>
    `;
  }).join('');

  dados.innerHTML = tableContent;
}

window.onload = carregarTabela;