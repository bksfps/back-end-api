var acc = document.getElementsByClassName("accordion");
var i;

for (i = 0; i < acc.length; i++) {
    acc[i].addEventListener("click", function () {
        this.classList.toggle("active");
        this.parentElement.classList.toggle("active");

        var pannel = this.nextElementSibling;

        if (pannel.style.display === "block") {
            pannel.style.display = "none";
        } else {
            pannel.style.display = "block";
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const authButton = document.getElementById('authButton');

    // Verifica se o usuário está logado
    const isLoggedIn = localStorage.getItem('loggedIn');

    if (isLoggedIn) {
        // Se o usuário estiver logado, exibe o botão "Sair"
        authButton.innerHTML = '<a href="#" onclick="logout()">Sair</a>';
    } else {
        // Se o usuário não estiver logado, exibe o botão "Login"
        authButton.innerHTML = '<a href="login.html">Login</a>';
    }
});

// Função de logout
function logout() {
    localStorage.removeItem('loggedIn'); // Remove o estado de login
    window.location.href = 'index.html'; // Redireciona para a homepage
}


// Função para buscar os produtos do banco de dados
async function carregarProdutos() {
    const response = await fetch('/api/produtos'); // Busca os produtos da API
    const produtos = await response.json();

    const produtosContainer = document.getElementById('produtosContainer');

    // Limpa o contêiner antes de adicionar os produtos
    produtosContainer.innerHTML = '';

    // Itera sobre os produtos e adiciona ao contêiner
    produtos.forEach(produto => {
        const produtoDiv = document.createElement('div');
        produtoDiv.classList.add('box');

        // Formatação do preço
        const precoFormatado = `R$ ${produto.preco.toFixed(2).replace('.', ',')}`;

        // Adiciona o HTML do produto
        produtoDiv.innerHTML = `
            <img src="${produto.imagemUrl}" alt="${produto.nome}">
            <h3>${produto.nome}</h3>
            <p>${produto.descricao}</p>
            <p><strong>Preço:</strong> ${precoFormatado}</p> <!-- Exibe o preço -->
            <a href="#" class="botao">Alugar</a>
        `;

        produtosContainer.appendChild(produtoDiv);
    });
}

// Chama a função ao carregar a página
document.addEventListener('DOMContentLoaded', carregarProdutos);

