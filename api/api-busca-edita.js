const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 5015; // Porta ajustada para a API de busca e edição

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

// Rota para buscar produtos ou consumidores
app.get('/buscar', (req, res) => {
  const termo = req.query.termo;
  if (!termo) {
    return res.status(400).send('Termo de busca é obrigatório.');
  }

  const query = `
    SELECT 'produto' AS tipo, id, nome FROM produto WHERE nome LIKE ? 
    UNION 
    SELECT 'consumidor' AS tipo, id, nome FROM consumidor WHERE nome LIKE ?
  `;
  const likeTermo = `%${termo}%`;
  db.query(query, [likeTermo, likeTermo], (err, results) => {
    if (err) {
      console.error('Erro ao buscar dados:', err);
      return res.status(500).send('Erro no servidor.');
    }
    res.json(results);
  });
});

// Rota para editar produto
app.put('/editar-produto/:id', (req, res) => {
  const { id } = req.params;
  const { nome, fabricante, modelo, bateria, camera, processador, tamanho_tela, qualidade_tela, capacidade_armazenamento, memoria_ram, preco, imagem_url, tags } = req.body;

  const query = `
    UPDATE produto SET nome = ?, fabricante = ?, modelo = ?, bateria = ?, camera = ?, processador = ?, 
    tamanho_tela = ?, qualidade_tela = ?, capacidade_armazenamento = ?, memoria_ram = ?, preco = ?, 
    imagem_url = ?, tags = ? WHERE id = ?
  `;

  db.query(query, [nome, fabricante, modelo, bateria, camera, processador, tamanho_tela, qualidade_tela, capacidade_armazenamento, memoria_ram, preco, imagem_url, tags, id], (err) => {
    if (err) {
      console.error('Erro ao atualizar produto:', err);
      return res.status(500).send('Erro ao atualizar produto.');
    }
    res.send('Produto atualizado com sucesso!');
  });
});

// Rota para editar consumidor
app.put('/editar-consumidor/:id', (req, res) => {
  const { id } = req.params;
  const { nome, profissao, idade, faixa_salarial, possui_filhos, trocou_carro, viaja_anualmente, trocou_smartphone, restricao_credito } = req.body;

  const query = `
    UPDATE consumidor SET nome = ?, profissao = ?, idade = ?, faixa_salarial = ?, possui_filhos = ?, 
    trocou_carro = ?, viagem_anual = ?, smartphone_recente = ?, poder_compra_reduzido = ? WHERE id = ?
  `;

  db.query(query, [nome, profissao, idade, faixa_salarial, possui_filhos, trocou_carro, viaja_anualmente, trocou_smartphone, restricao_credito, id], (err) => {
    if (err) {
      console.error('Erro ao atualizar consumidor:', err);
      return res.status(500).send('Erro ao atualizar consumidor.');
    }
    res.send('Consumidor atualizado com sucesso!');
  });
});

// Iniciar o servidor
app.listen(port, () => {
  console.log(`API de busca e edição rodando em http://localhost:${port}`);
});
