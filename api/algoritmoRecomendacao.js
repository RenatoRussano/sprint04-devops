const mysql = require('mysql');

// Configuração do pool de conexões do banco de dados
const db = mysql.createPool({
  connectionLimit: 10,
  host: 'devops_taqui.mysql.dbaas.com.br',
  user: 'devops_taqui',
  password: 'Marilia23@23',
  database: 'devops_taqui'
});

// Função principal para executar o algoritmo de recomendação
function recomendarProduto(consumidorId, callback) {
  db.query('SELECT * FROM consumidor WHERE id = ?', [consumidorId], (err, results) => {
    if (err) {
      console.error('Erro ao buscar dados do consumidor:', err);
      return callback('Erro ao buscar dados do consumidor.');
    }

    if (results.length === 0) {
      return callback('Consumidor não encontrado.');
    }

    const consumidor = results[0];
    let salarioAjustado = calcularSalarioAjustado(consumidor);
    const profissao = consumidor.profissao;
    const recomendacao = gerarRecomendacao(profissao, salarioAjustado, consumidor);

    callback(null, recomendacao);
  });
}

// Função para ajustar o salário com base nos fatores
function calcularSalarioAjustado(consumidor) {
  let salario = parseFloat(consumidor.faixa_salarial); // Substitua por uma lógica para obter o valor real
  const fatores = {
    filhos: consumidor.possui_filhos ? -0.05 : 0,
    carro: consumidor.trocou_carro ? -0.15 : 0,
    viagem: consumidor.viagem_anual ? -0.05 : 0,
    poderCompraReduzido: consumidor.poder_compra_reduzido ? -0.15 : 0
  };

  let ajusteTotal = 1 + fatores.filhos + fatores.carro + fatores.viagem + fatores.poderCompraReduzido;
  return salario * ajusteTotal;
}

// Função para gerar a recomendação com base na profissão e no salário ajustado
function gerarRecomendacao(profissao, salarioAjustado, consumidor) {
  const jsonMotivos = require('../data/recomendacoes.json'); // Importe o JSON com os motivos de recomendação
  let tipoTelefone;
  let produtoId;
  let motivo;

  // Definindo o tipo de telefone preferido com base na profissão
  switch (profissao.toLowerCase()) {
    case 'engenheiro':
      tipoTelefone = 'intermediario';
      motivo = jsonMotivos.motivos.profissao.engenheiro;
      break;
    case 'professor':
      tipoTelefone = 'basico';
      motivo = jsonMotivos.motivos.profissao.professor;
      break;
    case 'advogado':
    case 'medico':
      tipoTelefone = 'avancado';
      motivo = jsonMotivos.motivos.profissao[profissao.toLowerCase()];
      break;
    case 'desenvolvedor':
      tipoTelefone = 'de_ponta';
      motivo = jsonMotivos.motivos.profissao.desenvolvedor;
      break;
    default:
      tipoTelefone = 'basico';
      motivo = 'Profissão não reconhecida, recomendando um telefone básico.';
  }

  // Exemplo de lógica para escolher o produto com base no salário ajustado
  if (tipoTelefone === 'de_ponta' && salarioAjustado < 9000) {
    tipoTelefone = 'avancado';
    motivo += ' Devido ao orçamento, escolhemos uma opção mais acessível.';
  } else if (tipoTelefone === 'avancado' && salarioAjustado < 6000) {
    tipoTelefone = 'intermediario';
    motivo += ' Devido ao orçamento, escolhemos uma opção mais acessível.';
  } else if (tipoTelefone === 'intermediario' && salarioAjustado < 3000) {
    tipoTelefone = 'basico';
    motivo += ' Devido ao orçamento, escolhemos uma opção mais acessível.';
  }

  // Selecionar o produto com base no tipo de telefone
  produtoId = selecionarProduto(tipoTelefone);

  // Ajustar o motivo com base nos fatores adicionais
  if (consumidor.possui_filhos) {
    motivo += ' ' + jsonMotivos.ajustes.filhos;
  }
  if (consumidor.trocou_carro) {
    motivo += ' ' + jsonMotivos.ajustes.carro;
  }
  if (consumidor.viagem_anual) {
    motivo += ' ' + jsonMotivos.ajustes.viagem;
  }
  if (consumidor.poder_compra_reduzido) {
    motivo += ' ' + jsonMotivos.ajustes.poder_compra_reduzido;
  }
  if (consumidor.smartphone_recente) {
    motivo = jsonMotivos.ajustes.smartphone;
    produtoId = null; // Não recomendamos nenhum produto
  }

  return { produtoId, motivo };
}

// Função para selecionar o produto (substitua isso com a lógica real de escolha de produto)
function selecionarProduto(tipoTelefone) {
  const produtos = {
    basico: 1, // Exemplo: ID do produto básico
    intermediario: 2, // Exemplo: ID do produto intermediário
    avancado: 3, // Exemplo: ID do produto avançado
    de_ponta: 4 // Exemplo: ID do produto de ponta
  };
  return produtos[tipoTelefone];
}

module.exports = recomendarProduto;
