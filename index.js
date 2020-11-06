const express = require('express');
const bodyParser = require('body-parser');
//const { Usuario, Menu, MenuSubMenu, Perfil, PerfilMenu } = require('./app/models');
var dirfRouter = require('./app/routes/dirf');
const connection = require('./config/index')
const cors = require('cors');

printVariaveis()

connection.authenticate()
  .then((err) => {
    console.log('Conectado no banco', err);
  })
  .catch((err) => {
    console.log('Erro ao conectar com o banco de dados', err);
  });

const app = express();

/* app.use((req, res, next) => {
	//Qual site tem permissão de realizar a conexão, no exemplo abaixo está o "*" indicando que qualquer site pode fazer a conexão
    res.header("Access-Control-Allow-Origin", "*");
	//Quais são os métodos que a conexão pode realizar na API
    res.header("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE');
    app.use(cors());
    next();
}); */

app.use(cors())
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/legal-service/dirf/v1', dirfRouter);

const port = process.env.PORT || 3000

app.listen(port);


function printVariaveis() {
  
  console.log("###############################")
  console.log("VARIAVEIS CONFIGURADAS")
  console.log("###############################")
  console.log("DB_HOST=" + (process.env.DB_HOST || "bprspsql25d"))
  console.log("DB_NAME=" + (process.env.DB_NAME || "legal"))
  console.log("PORT=" + (process.env.PORT || "3000"))

  if (process.env.DB_PASSWORD) {
    console.log("DB_PASSWORD=" + "SETADO")
  }
  else {
    console.log("DB_PASSWORD=" + "DEFAULT")
  }

  if (process.env.DB_USERNAME) {
    console.log("DB_USERNAME=" + "SETADO")
  }
  else {
    console.log("DB_USERNAME=" + "DEFAULT")
  }

  console.log("BUS_URL_ANOS=" + (process.env.BUS_URL_ANOS || "https://bprspwas11d.brasilprev.corp/bprlegaisdm/v1/dirf/anos/"))
  console.log("BUS_URL_GERAR_JSON=" + (process.env.BUS_URL_GERAR_JSON || "https://bprspbus11d.brasilprev.corp/api/legais/dirf/v1/gerar"))
}
