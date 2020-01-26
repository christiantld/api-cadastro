const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");

router.get("/", auth, (req, res) => {
  const id = res.locals.auth_data.id;
  console.log(id);
  return res.send({ message: "Usuario autorizado" });
});

router.post("/", (req, res) => {
  return res.send({ message: "tudo ok com metodo POST da raiz" });
});

module.exports = router;
