var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send(`Signup page`);
  const dataAtual = new Date().toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" });
  console.log(`[${dataAtual}] Acessado: ${req.method} ${req.url}`);

});

module.exports = router;
