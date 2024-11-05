const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
const port = 5025; // Ajuste a porta conforme necessário

app.use(cors());
app.use(express.json());

// Configuração do pool de conexões do banco de dados MySQL
const db = mysql.createPool({
  connectionLimit: 10,
  host: 'devops_taqui.mysql.dbaas.com.br',
  user: 'devops_taqui',
  password: 'Marilia23@23',
  database: 'devops_taqui'
});

// Rota para obter consumidores
app.get('/api/consumidores', (req, res) => {
  db.query('SELECT id, nome FROM consumidor', (err, results) => {
    if (err) {
      console.error('Erro ao buscar consumidores:', err);
      return res.status(500).send('Erro no servidor.');
    }
    res.json(results);
  });
});

// Rota para obter produtos
app.get('/api/produtos', (req, res) => {
  db.query('SELECT id, nome FROM produto', (err, results) => {
    if (err) {
      console.error('Erro ao buscar produtos:', err);
      return res.status(500).send('Erro no servidor.');
    }
    res.json(results);
  });
});

// Rota para associar consumidor e produto
app.post('/api/associar', (req, res) => {
  const { consumidorId, produtoId } = req.body;
  const query = 'INSERT INTO relacao (consumidor_id, produto_id) VALUES (?, ?)';
  db.query(query, [consumidorId, produtoId], (err) => {
    if (err) {
      console.error('Erro ao associar consumidor e produto:', err);
      return res.status(500).send('Erro no servidor.');
    }
    res.send('Associação realizada com sucesso!');
  });
});

// Rota para obter todas as relações
app.get('/api/relacoes', (req, res) => {
  const query = `
    SELECT r.id, c.nome AS consumidor_nome, p.nome AS produto_nome, r.data_associacao 
    FROM relacao r
    JOIN consumidor c ON r.consumidor_id = c.id
    JOIN produto p ON r.produto_id = p.id
    ORDER BY r.id
  `;
  db.query(query, (err, results) => {
    if (err) {
      console.error('Erro ao buscar relações:', err);
      return res.status(500).send('Erro no servidor.');
    }
    res.json(results);
  });
});

// Iniciar o servidor
app.listen(port, () => {
  console.log(`API de Relação rodando em http://localhost:${port}`);
});
