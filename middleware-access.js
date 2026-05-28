// middleware de acesso
// ele será usado para realizar uma autenticação

// Importando a biblioteca do express
const express = require('express');
// Criando a aplicação
const app = express();
// Definição da PORTA
const PORT = 3000;
// middleware nativo para interpretar JSON
app.use(express.json());

// Criação do middleware de verificação de acesso
function verificarAcesso(req, res, next) {
    const autorizado = false; // simulação de acesso
    // true: acesso liberado
    // false: acesso negado
    if(autorizado) {
        next(); // estando autorizado, pode prosseguir
    } else { 
        // Se não estiver autorizado, o acesso estará negado
        res.status(403).json({
            mensagem: "acesso negado"
        });
    }
}
// Incluindo o middleware para a requisição do tipo GET, para a rota "/admin"
app.get("/admin", verificarAcesso, (req, res) => {
    res.json({
        mensagem: "Área administrativa acessada!"
    });
});

// Definindo a porta
app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
});


