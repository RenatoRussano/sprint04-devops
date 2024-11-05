const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 5099; // Porta ajustada para a API

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

// Rotas para produtos
app.get('/produtos', (req, res) => {
  const query = 'SELECT id, nome, fabricante, modelo, preco FROM produto ORDER BY id';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Erro ao buscar produtos:', err);
      return res.status(500).send('Erro no servidor.');
    }
    res.json(results);
  });
});

app.put('/editar-produto/:id', (req, res) => {
  const { id } = req.params;
  const { nome, fabricante, modelo, preco } = req.body;

  const query = `
    UPDATE produto 
    SET nome = ?, fabricante = ?, modelo = ?, preco = ? 
    WHERE id = ?
  `;
  db.query(query, [nome, fabricante, modelo, preco, id], (err) => {
    if (err) {
      console.error('Erro ao atualizar produto:', err);
      return res.status(500).send('Erro ao atualizar produto.');
    }
    res.send('Produto atualizado com sucesso!');
  });
});

app.delete('/apagar-produto/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM produto WHERE id = ?';
  db.query(query, [id], (err) => {
    if (err) {
      console.error('Erro ao apagar produto:', err);
      return res.status(500).send('Erro ao apagar produto.');
    }
    res.send('Produto apagado com sucesso!');
  });
});

// Rotas para consumidores
app.get('/consumidores', (req, res) => {
  const query = 'SELECT id, nome, idade, profissao FROM consumidor ORDER BY id';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Erro ao buscar consumidores:', err);
      return res.status(500).send('Erro no servidor.');
    }
    res.json(results);
  });
});

app.put('/editar-consumidor/:id', (req, res) => {
  const { id } = req.params;
  const { nome, idade, profissao } = req.body;

  const query = `
    UPDATE consumidor 
    SET nome = ?, idade = ?, profissao = ? 
    WHERE id = ?
  `;
  db.query(query, [nome, idade, profissao, id], (err) => {
    if (err) {
      console.error('Erro ao atualizar consumidor:', err);
      return res.status(500).send('Erro ao atualizar consumidor.');
    }
    res.send('Consumidor atualizado com sucesso!');
  });
});

app.delete('/apagar-consumidor/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM consumidor WHERE id = ?';
  db.query(query, [id], (err) => {
    if (err) {
      console.error('Erro ao apagar consumidor:', err);
      return res.status(500).send('Erro ao apagar consumidor.');
    }
    res.send('Consumidor apagado com sucesso!');
  });
});

// Iniciar o servidor
app.listen(port, () => {
  console.log(`API rodando em http://localhost:${port}`);
});
