document.addEventListener('DOMContentLoaded', () => {
    const consumidorSelect = document.getElementById('consumidor-select');
    const produtoSelect = document.getElementById('produto-select');
    const associarBtn = document.getElementById('associar-btn');
    const relacaoTabela = document.getElementById('relacao-tabela');

    // Carregar consumidores e produtos
    fetch('http://localhost:5025/api/consumidores')
        .then(response => response.json())
        .then(data => {
            data.forEach(consumidor => {
                const option = document.createElement('option');
                option.value = consumidor.id;
                option.textContent = consumidor.nome;
                consumidorSelect.appendChild(option);
            });
        })
        .catch(error => console.error('Erro ao buscar consumidores:', error));

    fetch('http://localhost:5025/api/produtos')
        .then(response => response.json())
        .then(data => {
            data.forEach(produto => {
                const option = document.createElement('option');
                option.value = produto.id;
                option.textContent = produto.nome;
                produtoSelect.appendChild(option);
            });
        })
        .catch(error => console.error('Erro ao buscar produtos:', error));

    // Associar consumidor e produto
    associarBtn.addEventListener('click', () => {
        const consumidorId = consumidorSelect.value;
        const produtoId = produtoSelect.value;

        fetch('http://localhost:5025/api/associar', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ consumidorId, produtoId })
        })
        .then(response => response.text())
        .then(message => {
            alert(message);
            carregarRelacoes();
        })
        .catch(error => console.error('Erro ao associar:', error));
    });

    // Carregar relações
    function carregarRelacoes() {
        fetch('http://localhost:5025/api/relacoes')
            .then(response => response.json())
            .then(data => {
                relacaoTabela.innerHTML = '';
                data.forEach(relacao => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${relacao.id}</td>
                        <td>${relacao.consumidor_nome}</td>
                        <td>${relacao.produto_nome}</td>
                        <td>${relacao.data_associacao}</td>
                    `;
                    relacaoTabela.appendChild(row);
                });
            })
            .catch(error => console.error('Erro ao buscar relações:', error));
    }

    // Inicializar tabela
    carregarRelacoes();
});
