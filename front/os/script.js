const uri = 'http://localhost:3000/os';
const dados = document.getElementById('dados');

let os = [];

async function carregarTabela() {
  try {
    const response = await fetch(uri);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    os = await response.json();
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

  const tableContent = os.map((os) => {
    return `
      <tr>
        <td>${os.id}</td>
        <td>${os.descricao}</td>
        <td>${os.colaborador}</td>
        <td>${os.executor}</td>
        <td>${os.abertura.split('T')[0]}</td>
        <td>${os.encerramento.split("T")[0]}</td>
      </tr>
    `;
  }).join('');

  dados.innerHTML = tableContent;
}

window.onload = carregarTabela;