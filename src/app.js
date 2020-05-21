// Importar o express para dentro do projeto
const express = require("express");
const cors = require("cors");
const { errors } = require("celebrate");
const routes = require("./routes");

// Inicializar o express
const app = express();

// Indico atraves do origen: qual a URL que terá acesso a API
app.use(cors());

// Indica que os retornos do express seram em JSON
app.use(express.json());

// Inicializa as rotas
app.use(routes);

// Melhora a visualização e trata os erros do celebrate
app.use(errors());

//Cria nosso server na porta sugerida
// Para uso de testes essa aplicação foi parada
// e exportada
// app.listen(3333);

module.exports = app;
