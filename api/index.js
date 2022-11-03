var express = require('express');
var router = express.Router();

router.use('/users', require('./users'));

router.get('/', (req, res) => {
  res.json({ body: 'Hello World' });
});

module.exports = router;
