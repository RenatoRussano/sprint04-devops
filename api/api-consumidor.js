const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 5012; // Porta ajustada para consumidores

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Configuração do pool de conexões do banco de dados MySQL
const db = mysql.createPool({
  connectionLimit: 10,
  host: 'devops_taqui.mysql.dbaas.com.br',
  user: 'devops_taqui',
  password: 'Marilia23@23',
  database: 'devops_taqui'
});

// Rota para adicionar um consumidor
app.post('/adicionar-consumidor', (req, res) => {
  const {
    nome,
    profissao,
    idade,
    faixa_salarial,
    possui_filhos,
    trocou_carro,
    viaja_anualmente,
    trocou_smartphone,
    restricao_credito
  } = req.body;

  // Verifica se todos os campos obrigatórios foram fornecidos
  if (!nome || !profissao || !idade || !faixa_salarial) {
    return res.status(400).send('Campos obrigatórios: nome, profissão, idade, faixa salarial');
  }

  // Consulta para inserir o consumidor no banco de dados
  const query = `
    INSERT INTO consumidor (
      nome, profissao, idade, faixa_salarial,
      possui_filhos, trocou_carro, viagem_anual,
      smartphone_recente, poder_compra_reduzido
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;
  db.query(query, [
    nome,
    profissao,
    idade,
    faixa_salarial,
    possui_filhos ? 1 : 0,
    trocou_carro ? 1 : 0,
    viaja_anualmente ? 1 : 0,
    trocou_smartphone ? 1 : 0,
    restricao_credito ? 1 : 0
  ], (err, result) => {
    if (err) {
      console.error('Erro ao inserir consumidor:', err);
      return res.status(500).send('Erro ao adicionar consumidor');
    }
    res.send('Consumidor adicionado com sucesso!');
  });
});

// Iniciar o servidor
app.listen(port, () => {
  console.log(`API rodando em http://localhost:${port}`);
});
