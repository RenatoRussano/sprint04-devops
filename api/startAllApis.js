const { exec } = require('child_process');

// Lista de comandos para iniciar cada API em cascata
const apis = [
  'node algoritmoRecomendacao.js',
  'node api-busca-edita.js',
  'node api-buscar-consumidor.js',
  'node api-consumidor.js',
  'node api-historico.js',
  'node api-home.js',
  'node api-login.js',
  'node api-produto.js',
  'node api-salvar-recomendacao.js',
  'node api-relacao.js'
];

// Função para iniciar cada API em cascata
function startApis() {
  apis.forEach(api => {
    const process = exec(api);
    process.stdout.on('data', data => console.log(`[${api}]: ${data}`));
    process.stderr.on('data', data => console.error(`[${api} ERROR]: ${data}`));
  });
  console.log('Todas as APIs foram iniciadas!');
}

// Iniciar as APIs
startApis();
