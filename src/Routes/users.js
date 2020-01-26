const express = require("express");
const router = express.Router();
const Users = require("../model/user");
const bcrypt = require("bcrypt");
const createUserToken = require("../utils/createUserToken");

// Buscar todos - GET
router.get("/", async (req, res) => {
  try {
    const users = await Users.find({});
    return res.send(users);
  } catch (err) {
    console.log(err);
    return res.status(500).send({
      error: "Erro na consulta de usuarios"
    });
  }
});
// Create - Post
router.post("/create", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).send({ error: "Dados insuficientes" });

  try {
    if (await Users.findOne({ email }))
      return res.status(400).send({ error: "Usuario ja cadastrado" });

    const user = await Users.create(req.body);
    user.password = undefined;
    return res.status(201).send({ user, token: createUserToken(user.id) });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ error: "Erro ao buscar o usuario" });
  }
});

// Autenticacao - Post
router.post("/auth", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).send({ error: "Dados insuficientes" });

  try {
    const user = await Users.findOne({ email }).select("+password");
    if (!user) return res.status(400).send({ error: "Usuario nao cadastrado" });

    const passOk = await bcrypt.compare(password, user.password);
    if (!passOk) return res.status(401).send({ error: "Senha Invalida" });

    user.password = undefined;
    return res.send({
      user,
      token: createUserToken(user.id),
      message: "Usuario Valido"
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ error: "Erro ao buscar o usuario" });
  }
});
module.exports = router;
