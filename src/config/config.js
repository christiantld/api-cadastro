const env = process.env.NODE_ENV || "dev";
require("dotenv").config({ path: "../.env" });

const cfg = () => {
  switch (env) {
    case "dev":
      return {
        bd_string: `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0-lkaip.mongodb.net/test?retryWrites=true&w=majority`,
        jwt_pass: `${process.env.JWT_KEY}`,
        jwt_expires_in: `${process.env.JWT_EXPIRES_IN}`
      };
    // mudar quando houver ambiente de homologacao  e producao
    case "hml":
      return {
        bd_string: `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0-lkaip.mongodb.net/test?retryWrites=true&w=majority`,
        jwt_pass: `${process.env.JWT_KEY}`,
        jwt_expires_in: `${process.env.JWT_EXPIRES_IN}`
      };
    case "prod":
      return {
        bd_string: `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0-lkaip.mongodb.net/test?retryWrites=true&w=majority`,
        jwt_pass: `${process.env.JWT_KEY}`,
        jwt_expires_in: `${process.env.JWT_EXPIRES_IN}`
      };
  }
};

console.log(`Iniciando a API em modo ${env.toUpperCase()}`);

module.exports = cfg();
