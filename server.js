// antes de iniciar a criação do servidor com Node.js e Express, precisamos inicializar o npm: npm init -y
// Após, precisamos instalar o express, pra isso, usamos:
// npm install express (no terminal)

// EXPRESS -> Framework para Node.js que facilita a criação de servidores e APIs.

// Importa a biblioteca Express dentro do projeto
const express = require("express");

// Cria a aplicação Express (assim teremos acesso aos recursos do framework)
const app = express();

// Define a porta onde o servidor será executado
const PORT = 3000; 

// Middleware próprio do Express que permite a aplicação entender dados enviados em formato json (principalmente nas requisições do tipo POST e PUT)
app.use(express.json());

// Criando um Endpoint (ponto de acesso ao servidor/API)
// app -> aplicação express
// .get -> método http
// "/" -> rota/caminho
// (req, res) -> função com parametros de requisição e resposta
// res.send -> resposta
app.get("/", (req, res) => {
    // Envia uma resposta simples para o navegador
    res.send("Servidor Express funcionando");
});

// Método get + rota de produtos para listar produtos específicos
app.get("/produtos", (req, res) => {
    res.json([
        {id:1, nome: "Notebook", preco: 7000},
        {id:2, nome: "Mouse", preco: 80}
    ]);
});

// parâmetros de rota (acessar um item expecífico)
app.get("/produtos/:id", (req, res) => {
    // re.params captura os parâmetros enviados pela URL
    // neste caso, queremos o parâmetro: ID
    const id = req.params.id

    // Resposta 
    res.json({
        mensagem: "Produto encontrado",
        id: id
    });
});

// método get + rota de usuários para listar usuários cadastrados
app.get("/usuarios", (req, res) => {
    res.json([
        {id: 1, nome: "Ana"},
        {id:2, nome: "Gabrielly"}
    ]);
});

// Método POST + rota de produtos
app.post("/produtos", (req, res) => {
    const novoProduto = req.body;
    res.json({
        mensagem: "Produto cadastrado com sucesso",
        produto: novoProduto
    });
});

// método PUT + rota de produtos
app.put("/produtos", (req, res) => {
    const dadosAtualizados = req.body;
    res.json({
        mensagem: "Pruduto atualizado",
        dados: dadosAtualizados
    });
});

// Método delete + rota de produtos
app.delete("/produtos/:id", (req, res) => {
    const id = req.params.id;
    res.json({
        mensagem: "Produto removido com sucesso",
        id: id
    });
});

app.listen(PORT, () =>{
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});