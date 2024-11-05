
# Sistema de Recomendação e Relacionamentos

Este projeto é um sistema de recomendação e gerenciamento de relacionamentos entre consumidores e produtos. Ele inclui várias APIs em Node.js, páginas HTML com estilos personalizados, e uma estrutura de banco de dados para armazenar consumidores, produtos, e recomendações.

---

## Entregável **DevOps**: Challenge Sprint 04


- **Gabriel Sampaio** RM 552342
- **Gabriel Neves** RM 552244
- **Livia Freitas** RM 99892
- **Rafael Mendonça** RM 552422
- **Renato Romeu** RM 551325

---

## Estrutura do Projeto

- **HTML e Front-end**: Arquivos HTML, CSS, e JavaScript localizados na pasta raiz e em `assets`.
- **APIs em Node.js**: Localizadas na pasta `api`, cada uma serve para uma funcionalidade específica (e.g., `api-consumidor.js`, `api-relacao.js`).
- **Dados**: Arquivos JSON e SQL para popular e configurar o banco de dados.
- **Imagens**: Logos e ícones armazenados na pasta `img`.

---

## Como Iniciar o Projeto

### Iniciando Manualmente Cada API

1. **Navegue até a pasta `api` no terminal**:
   ```bash
   cd api
   ```

2. **Inicie cada API individualmente**:
   ```bash
   node api-consumidor.js
   node api-relacao.js
   node api-produto.js
   node api-historico.js
   node api-home.js
   node api-login.js
   node api-salvar-recomendacao.js
   node api-busca-edita.js
   ```

---

### Iniciando Todas as APIs de Uma Vez

1. **Usando o Script `startAllApis.js`**:
   - Certifique-se de estar na pasta `api`.
   - Execute o script:
     ```bash
     node startAllApis.js
     ```

2. **Usando o Script Bash `start.sh` (Linux/Mac)**:
   - Torne o script executável:
     ```bash
     chmod +x start.sh
     ```
   - Execute o script:
     ```bash
     ./start.sh
     ```

---

## Lista de Portas Usadas

- **API de Consumidor**: `5025`
- **API de Produtos**: `5026`
- **API de Relacionamento**: `5027`
- **API de Histórico**: `5028`
- **API de Login**: `5029`
- **API de Busca e Edição**: `5030`
- **API de Recomendação**: `5031`
- **Live Server do VSCode**: `5500` (ou configure manualmente)

> **Nota**: Se você usar o Live Server no VSCode, ele deve rodar na porta `5500` ou conforme a configuração do usuário.

---

## Configurações Relevantes

1. **Banco de Dados**: O banco de dados MySQL deve ser configurado conforme os arquivos SQL fornecidos.
2. **Conexão com o Banco**: As credenciais do banco de dados estão em `renato.txt` e configuradas em cada API.

---

## Instruções Adicionais

- Certifique-se de que o MySQL está rodando e o banco de dados está configurado corretamente.
- Use o Live Server do VSCode para testar as páginas HTML na porta `5500`.
- Se necessário, ajuste as configurações de porta para o seu ambiente.

---

## Tecnologias Utilizadas

- **Node.js**: Para a criação das APIs.
- **MySQL**: Banco de dados relacional para armazenar consumidores, produtos, e relações.
- **HTML/CSS/JavaScript**: Para a interface de usuário.
- **Express.js**: Framework usado para as APIs.

---

## Como Contribuir

1. Faça um fork do projeto.
2. Crie um branch para sua feature: `git checkout -b minha-feature`.
3. Commit suas mudanças: `git commit -m 'Adiciona minha feature'`.
4. Faça um push para o branch: `git push origin minha-feature`.
5. Abra um pull request.

---

## Autor

Este projeto foi desenvolvido com foco em aprendizado e gestão de relacionamentos entre consumidores e produtos. Para dúvidas ou sugestões, sinta-se à vontade para contribuir ou entrar em contato.
