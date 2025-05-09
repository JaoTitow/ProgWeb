var express = require('express');
var router = express.Router();

// Rota GET para '/data'
router.get('/', function(req, res, next) {
  res.send('GET request to /data');
});

// Rota POST para '/data'
router.post('/', function(req, res, next) {
  res.send('POST request to /data');
});

module.exports = router;
