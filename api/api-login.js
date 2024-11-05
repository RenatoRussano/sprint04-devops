const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 5013; // Porta ajustada para a API de login

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

// Rota para autenticar usuário
app.post('/login', (req, res) => {
  const { usuario, senha } = req.body;

  // Verificar se os campos foram fornecidos
  if (!usuario || !senha) {
    return res.status(400).send('Usuário e senha são obrigatórios.');
  }

  // Consulta ao banco de dados
  const query = 'SELECT * FROM usuario WHERE usuario = ? AND senha = ?';
  db.query(query, [usuario, senha], (err, results) => {
    if (err) {
      console.error('Erro ao consultar o banco de dados:', err);
      return res.status(500).send('Erro no servidor.');
    }

    if (results.length > 0) {
      res.send('Login bem-sucedido!');
    } else {
      res.status(401).send('Usuário ou senha inválidos.');
    }
  });
});

// Iniciar o servidor
app.listen(port, () => {
  console.log(`API de login rodando em http://localhost:${port}`);
});
