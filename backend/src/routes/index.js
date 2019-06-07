const router = require('express').Router();

router.use('/messages', require('./messages'));

module.exports = router;
