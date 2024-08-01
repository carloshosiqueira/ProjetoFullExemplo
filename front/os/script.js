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
    console.error('Error fetching data:', error);
  }
}

function preencherTabela() {
  if (!dados) {
    console.error('Element #dados not found');
    return;
  }

  const tableContent = os.map((os) => {
    return `
      <tr>
        <td>${os.id}</td>
        <td>${os.descricao}</td>
        <td>${os.colaborador}</td>
        <td>${os.executor}</td>
        <td>${os.abertura}</td>
        <td>${os.encerramento}</td>
      </tr>
    `;
  }).join('');

  dados.innerHTML = tableContent;
}

window.onload = carregarTabela;