// importando o modulo express
const express = require("express");
const { addListener } = require("nodemon");
const app = express();
// traduzir os dados enviandos do formulario javascript para o backend
const bodyParser = require("body-parser")
const Sequelize = require("sequelize")
const connection = require("./database/database");
const Pergunta = require("./database/Pergunta");
const req = require("express/lib/request");
const Resposta = require("./database/Resposta");



// Database

connection
    .authenticate()
    .then(() => {
        console.log("Conexao feita com sucesso")
    })
    .catch((MsgError) => {
        console.log("Conexao feita com sucesso")
    })


// chamando o renderizador de HTML
app.set("view engine","ejs");
app.use(express.static("public"));


// Traduz os dados para javascript
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json());

// ROTAS PAGINA PRINCIPAL 
app.get("/", (request,response) => {
    // RAW = PESQUISA CRUA, VAI BUSCAR APENAS OS DADOS LISTADOS     
    // order por ID na ordem decrescente ( usando o arraw dentro de outro arraw )
    Pergunta.findAll({raw : true , order:[["id","DESC"]
]}).then(perguntas => { // SELECT ALL FROM PERGUNTAS // RECEBER A LISTA DE PERGUNTAS
        console.log(perguntas);
        response.render("index", {
            perguntas: perguntas
        });
    })

   
}); 
app.get("/perguntas",(request,response) => {
    response.render("perguntas");
}); 

// TRABALHAR APENAS COM FORMULARIOS "POST" NO BACKEND
// ROTAS DO TIPO POST GERALMENTE SAO USADAS PARA DADOS DE USUARIO
app.post("/salvarpergunta", (request,response) => {
    var titulo = request.body.titulo; 
    var descricao = request.body.descricao;  
    Pergunta.create({
        titulo: titulo,
        descricao: descricao
    }).then(() => {
        response.redirect("/");
    });
}); 
// rota + parametro para a pagina da pergunta
app.get('/pergunta/:id', (request,response) => {
    var id = request.params.id
    // chamar o model pergunta
    // FindOne = metodo do sequelize que busca um dado no banco de dados
    Pergunta.findOne({
        // onde o Id for igual a ID / ex perguntar id 4 vai na pergunta 4 / buscas por condicoes
        where: {id : id }
    }).then(pergunta => {
        if(pergunta != undefined) { // pergunta encontrada 
            response.render("pergunta", {
                pergunta:pergunta
            });
        } else { // nao encontrada
            response.redirect('/');
        }
    })
});

app.post("/responder",(request,response) => {
        var corpo = request.body.corpo
        var perguntaID = request.body.pergunta
        Resposta.create({
            corpo: corpo,
            perguntaID: perguntaID
        }).then(() => {
            response.redirect("/pergunta/"+perguntaID);
        });

});

app.listen(3333,() => {
    console.log("Funcionando")
});


