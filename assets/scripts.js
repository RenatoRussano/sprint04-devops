// Função para Carregar Profissões e Faixas Salariais de um JSON
async function carregarProfissoesEFaixas() {
  try {
    const response = await fetch('profissoes.json'); // Caminho ajustado
    const data = await response.json();

    // Carregar as profissões
    const profissaoSelect = document.querySelector('select[placeholder="Profissão"]');
    if (profissaoSelect) {
      data.profissoes.forEach(profissao => {
        const option = document.createElement('option');
        option.value = profissao;
        option.textContent = profissao;
        profissaoSelect.appendChild(option);
      });
    }

    // Carregar as faixas salariais
    const faixaSalarialSelect = document.querySelector('select[placeholder="Faixa Salarial"]');
    if (faixaSalarialSelect) {
      data.faixas_salarial.forEach(faixa => {
        const option = document.createElement('option');
        option.value = faixa;
        option.textContent = faixa;
        faixaSalarialSelect.appendChild(option);
      });
    }
  } catch (error) {
    console.error("Erro ao carregar as profissões e faixas salariais:", error);
  }
}

// Chamar a função de carregar profissões e faixas salariais quando a página for carregada
document.addEventListener('DOMContentLoaded', carregarProfissoesEFaixas);

// Função para Cadastrar Consumidor
document.querySelector('.consumer-form')?.addEventListener('submit', async (event) => {
  event.preventDefault();

  const consumidor = {
    nome: document.querySelector('input[placeholder="Nome do consumidor"]').value,
    profissao: document.querySelector('select[placeholder="Profissão"]').value,
    idade: parseInt(document.querySelector('input[placeholder="Idade"]').value),
    faixa_salarial: document.querySelector('select[placeholder="Faixa Salarial"]').value,
    possui_filhos: document.querySelector('select[placeholder="Possui filhos?"]').value === 'Sim',
    trocou_carro: document.querySelector('select[placeholder="Trocou de carro?"]').value === 'Sim',
    viaja_anualmente: document.querySelector('select[placeholder="Viaja anualmente?"]').value === 'Sim',
    trocou_smartphone: document.querySelector('select[placeholder="Trocou smartphone?"]').value === 'Sim',
    restricao_credito: document.querySelector('select[placeholder="Restrição de crédito?"]').value === 'Sim'
  };

  try {
    const response = await fetch('http://localhost:5012/adicionar-consumidor', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(consumidor)
    });

    if (response.ok) {
      alert("Consumidor cadastrado com sucesso!");
      document.querySelector('.consumer-form').reset();
    } else {
      alert("Erro ao cadastrar o consumidor.");
    }
  } catch (error) {
    console.error('Erro ao cadastrar o consumidor:', error);
    alert("Ocorreu um erro ao cadastrar o consumidor. Tente novamente mais tarde.");
  }
});
