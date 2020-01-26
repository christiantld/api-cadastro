const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const config = require("./config/config");

//Conexao com BD
const url = config.bd_string;
console.log(url);

const options = {
  reconnectTries: Number.MAX_VALUE,
  reconnectInterval: 500,
  poolSize: 5,
  useNewUrlParser: true
};

mongoose.connect(url, options);
mongoose.set("useCreateIndex", true);

mongoose.connection.on("connected", () => {
  console.log("Aplicacao conectada ao banco de dados");
});
mongoose.connection.on("error", err => {
  console.log("Erro na conexao com banco de dados" + err);
});
mongoose.connection.on("disconnected", () => {
  console.log("Aplicacao desconectada do banco de dados");
});

//Body Parser
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());

//Importando rotas
const indexRoute = require("./Routes/index");
const userRoute = require("./Routes/users");

app.use("/", indexRoute);
app.use("/users", userRoute);

app.listen(3000);

module.exports = app;
