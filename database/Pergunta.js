const Sequelize = require('sequelize');
const connection = require("./database")


// definindo o model - model e a representacao da tabela no javascript.
const Pergunta = connection.define("perguntas", {
    titulo:{ // nome do campo
        type: Sequelize.STRING, // tipo do texto // STRING PARA TEXTOS CURTOS.
        allowNull : false
    },

    descricao:{
        type: Sequelize.TEXT, // TEXT PARA TESTOS
        allowNull : false
    }
});
// criar a tabela e forcar ela a criar caso ainda n tenha criado
Pergunta.sync({force:false}).then(() => {});

module.exports = Pergunta;



