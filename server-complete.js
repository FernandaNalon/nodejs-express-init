// Importa a biblioteca do express
const express = require('express');

// Cria a aplicação express
const app = express();

// Definição da porta do servidor
const PORT = 3000;

// Middleware nativo do express para interpretar JSON
app.use(express.json());

// Middleware de log
function logger(req, res, next){
    // Exibe o método e a url acessada
    console.log(req.method, req.url);
    next(); // continua a execução
};
app.use(logger); // Aplica o middleware em todas as rotas

// Middleware de validação de senha
function verificarAcesso(req, res, next){
    // const senha irá armazenhar o valor da chave "senha", que será passado através da URL da requisição
    // LEMBRANDO: query parametters (/admin?senha=...)
    const senha = req.query.senha;
    if(senha==="1234"){
        // Com a senha correta, podemos ir para o proximo passo
        next(); 
    } else {
        // Senão, o acesso será negado já com a verificação do middleware, retornando o acesso negado devido a senha incorreta
        res.status(403).json({
            mensagem: "Acesso negado, senha incorreta"
        });
    };
};

// Array de produtos (produtos em memória)
let produtos = [
    {id:1, nome: "Notebook", preco: 7000},
    {id:2, nome: "Mouse", preco: 80}
];

// Rota inicial (método get + rota "/")
app.get("/", (req, res) => {
    res.send("Servidor Express funcionando");
});

// Rota de exibição de produtos (método get + rota "/produtos")
app.get("/produtos", (req, res) => {
    res.json({
        Produtos: produtos
    });
});

// Busca de produtos através do ID (método get + rota "/produtos/:id")
app.get("/produtos/:id", (req, res) => {
    // a const ID irá armazenar o ID informado nos query parametters da URL da requisição como: /produtos/1 (sendo o produto cujo id = 1)
    const id = req.params.id;
    // Assim que o produto for localizado, retorna mensagem e o produto
    res.json({
        mensagem: "Produto encontrado",
        // produtos = array de produtos
        // [] = com os colchetes, posso passar a posição do produto dentro do array
        // Caso o ID do produto seja 1, a posição dele no array é 0 (zero)
        // Então precisamos passar como [id-1]
        produto: produtos[id-1]
    });
});

// Cadastro de novo produto (método POST + rota "/produtos")
app.post("/produtos", (req, res) => {
    // A const novoProduto irá receber todo o conteúdo do corpo da requisição (body)
    const novoProduto = req.body;
    // .push é um método do Javascript para incluir novas informações dentro do meu array, no nosso contexto sendo o array de produtos, então: produtos.push(o produto novo)
    produtos.push(novoProduto);
    // Resposta do servido ao realizar o cadastro, exibindo uma mensagem de confirmação e exibindo os dados do produto novo
    res.json({
        mensagem: "Produto cadastrado com sucesso",
        produto: novoProduto
    });
});

// Atualização de produtos existentes (método PUT + rota "/produtos")
app.put("/produtos", (req, res) => {
    // a consta dadosAtualizados receberá o corpo da requisição com os dados atualizados
    const dadosAtualizados = req.body;
    // O array de produtos vai receber uma nova atribuição de valor, atualizada.
    // .map é um método JavaScript para que o array seja mapeado, dessa forma, enxergamos cada um dos objetos/produtos individualmente
    // produto (no singular) significa cada um dos objetos
    produtos = produtos.map(produto => {
        // se o id passado no corpo da requisição for identico ao id do nosso objeto
        if(produto.id === dadosAtualizados.id){
            // Apenas o preço do produto será atualizado e todos os outros dados como id e nome (devido ao "...produto") serão trazidos sem alteração
            return {
                ...produto,
                preco: dadosAtualizados.preco
            };
        }
        // retorna o produto atualizado para o array
        return produto;
    });
    // Resposta do servidor para a atualização
    res.json({
        produto: produtos
    });
});

// Apenas mensagem de deleção, mas não mexerá no nosso array
app.delete("/produtos/:id", (req, res) => {
    const id = req.params.id;
    res.json({
        mensagem: "Produto removido com sucesso"
    });
});

// Usando o middleware de verificação de acesso
app.get("/admin", verificarAcesso, (req, res) => {
    res.json({
        mensagem: "Área administrativa acessada"
    });
});

// Usado a porta de acesso
app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
});