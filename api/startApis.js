const { exec } = require('child_process');

const apis = [
  'api-busca-edita.js',
  'api-buscar-consumidor.js',
  'api-consumidor.js',
  'api-historico.js',
  'api-home.js',
  'api-login.js',
  'api-produto.js',
  'api-salvar-recomendacao.js'
];

apis.forEach(api => {
  const process = exec(api);
  process.stdout.on('data', data => console.log(data));
  process.stderr.on('data', data => console.error(data));
});
