const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
const port = 5016;

app.use(cors());

// Configuração do pool de conexões do banco de dados
const db = mysql.createPool({
  connectionLimit: 10,
  host: 'devops_taqui.mysql.dbaas.com.br',
  user: 'devops_taqui',
  password: 'Marilia23@23',
  database: 'devops_taqui'
});

// Endpoint para buscar todos os consumidores
app.get('/consumidores', (req, res) => {
  db.query('SELECT * FROM consumidor', (err, results) => {
    if (err) {
      console.error('Erro ao buscar consumidores:', err);
      return res.status(500).send('Erro no servidor.');
    }
    res.json(results);
  });
});

// Iniciar o servidor
app.listen(port, () => {
  console.log(`API de Consumidores rodando em http://localhost:${port}`);
});
