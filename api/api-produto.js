const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 5011; // Porta ajustada

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

// Rota para adicionar um produto
app.post('/adicionar-produto', (req, res) => {
  const {
    nome,
    fabricante,
    modelo,
    bateria,
    camera,
    processador,
    tamanhoTela,
    qualidadeTela, // Nome do campo ajustado
    armazenamento,
    memoriaRam,
    preco,
    imagemUrl,
    tags
  } = req.body;

  // Verifica se todos os campos obrigatórios foram fornecidos
  if (!nome || !fabricante || !modelo || !tags) {
    return res.status(400).send('Campos obrigatórios: nome, fabricante, modelo, tags');
  }

  // Consulta para inserir o produto no banco de dados
  const query = `
    INSERT INTO produto (
      nome, fabricante, modelo, bateria, camera, processador,
      tamanho_tela, qualidade_tela, capacidade_armazenamento, memoria_ram, preco, imagem_url, tags
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;
  db.query(query, [nome, fabricante, modelo, bateria, camera, processador, tamanhoTela, qualidadeTela, armazenamento, memoriaRam, preco, imagemUrl, tags], (err, result) => {
    if (err) {
      console.error('Erro ao inserir produto:', err);
      return res.status(500).send('Erro ao adicionar produto');
    }
    res.send('Produto adicionado com sucesso!');
  });
});

// Iniciar o servidor
app.listen(port, () => {
  console.log(`API rodando em http://localhost:${port}`);
});
