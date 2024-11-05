const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');
const recomendarProduto = require('./algoritmoRecomendacao');

const app = express();
const port = 5017;

app.use(cors());
app.use(bodyParser.json());

// Configuração do pool de conexões do banco de dados
const db = mysql.createPool({
  connectionLimit: 10,
  host: 'devops_taqui.mysql.dbaas.com.br',
  user: 'devops_taqui',
  password: 'Marilia23@23',
  database: 'devops_taqui'
});

// Endpoint para gerar e salvar uma recomendação
app.post('/recomendar', (req, res) => {
  const { consumidorId } = req.body;

  if (!consumidorId) {
    return res.status(400).send('ID do consumidor é obrigatório.');
  }

  recomendarProduto(consumidorId, (err, recomendacao) => {
    if (err) {
      return res.status(500).send(err);
    }

    // Salvar a recomendação no banco de dados
    const query = `
      INSERT INTO recomendacao (consumidor_id, produto_id, data_recomendacao, motivo_recomendacao)
      VALUES (?, ?, NOW(), ?)
    `;
    db.query(query, [consumidorId, recomendacao.produtoId, recomendacao.motivo], (err) => {
      if (err) {
        console.error('Erro ao registrar recomendação no banco:', err);
        return res.status(500).send('Erro ao registrar recomendação no banco.');
      }
      res.json(recomendacao);
    });
  });
});

// Iniciar o servidor
app.listen(port, () => {
  console.log(`API de Recomendação rodando em http://localhost:${port}`);
});
