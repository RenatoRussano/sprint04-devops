const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 5014; // Porta ajustada para a API de histórico

app.use(cors());
app.use(bodyParser.json());

// Configuração do pool de conexões do banco de dados MySQL
const db = mysql.createPool({
  connectionLimit: 10,
  host: 'devops_taqui.mysql.dbaas.com.br',
  user: 'devops_taqui',
  password: 'Marilia23@23',
  database: 'devops_taqui'
});

// Rota para buscar todas as recomendações
app.get('/historico-recomendacoes', (req, res) => {
  const query = `
    SELECT r.id, c.nome AS consumidor, p.nome AS produto, r.data_recomendacao, r.motivo_recomendacao
    FROM recomendacao r
    JOIN consumidor c ON r.consumidor_id = c.id
    JOIN produto p ON r.produto_id = p.id
    ORDER BY r.data_recomendacao DESC
  `;

  db.query(query, (err, results) => {
    if (err) {
      console.error('Erro ao buscar recomendações:', err);
      return res.status(500).send('Erro no servidor.');
    }
    res.json(results);
  });
});

// Iniciar o servidor
app.listen(port, () => {
  console.log(`API de histórico rodando em http://localhost:${port}`);
});
