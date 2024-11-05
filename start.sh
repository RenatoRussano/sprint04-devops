#!/bin/bash

echo "Iniciando API Algoritmo de Recomendação..."
node api/algoritmoRecomendacao.js &

echo "Iniciando API de Busca e Edição..."
node api/api-busca-edita.js &

echo "Iniciando API Buscar Consumidor..."
node api/api-buscar-consumidor.js &

echo "Iniciando API de Consumidor..."
node api/api-consumidor.js &

echo "Iniciando API Histórico..."
node api/api-historico.js &

echo "Iniciando API Home..."
node api/api-home.js &

echo "Iniciando API Login..."
node api/api-login.js &

echo "Iniciando API Produto..."
node api/api-produto.js &

echo "Iniciando API Salvar Recomendação..."
node api/api-salvar-recomendacao.js &

echo "Todas as APIs foram iniciadas!"
wait
