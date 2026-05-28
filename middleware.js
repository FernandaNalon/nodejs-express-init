// Importando a biblioteca do Express
const express = require('express');
// Criando a aplicação Express
const app = express();
// Definição da porta
const PORT = 3000

// Middleware nativo do Express para que a aplicação interprete requisições recebidas em JSON
app.use(express.json());

// Criando (para a nossa aplicação), uma requisição do tipo GET, com a rota "/produtos" e programando para que, a resposta dessa requisição, seja: res.json...
app.get("/produtos", (req, res) => {
    res.json({
        mensagem: "Middleware utilizado"
    });
});

// Middleware logger
// nosso middlware irá interpretar a requisição recebida, interpretar a resposta de dentro do servidor e realizar a ação
// req -> requisição
// res -> resposta
// next -> libera a passagem para a próxima etapa
function logger(req, res, next) {
    // req.method = pega o método da requisição
    // req.url = peha a rota da requisição
    console.log(req.method, req.url);
    next();
};

// aplicando o middleware "logger" em todas as rotas da aplicação 
app.use(logger);

// Definição da porta
app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
});

