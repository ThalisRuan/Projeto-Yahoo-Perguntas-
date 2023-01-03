const Sequelize = require('sequelize');

const connection = new Sequelize('guiaperguntas', 'root', '123456789', {
    host: 'localhost',
    dialect: 'mysql'
  });

function soma (a,b) {
  return a + b 
}

// exportando conecao para outros arquivos
module.exports = connection;