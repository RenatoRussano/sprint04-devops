// Função de Login
document.querySelector('.login-form')?.addEventListener('submit', async (event) => {
    event.preventDefault(); // Impede o comportamento padrão do formulário
  
    const usuario = document.getElementById("username").value;
    const senha = document.getElementById("password").value;
  
    try {
      const response = await fetch('http://localhost:5013/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ usuario, senha })
      });
  
      if (response.ok) {
        alert("Login bem-sucedido!");
        window.location.href = "home.html"; // Redireciona para a página inicial
      } else {
        alert("Usuário ou senha inválidos.");
      }
    } catch (error) {
      console.error("Erro ao realizar login:", error);
      alert("Ocorreu um erro. Tente novamente mais tarde.");
    }
  });
  