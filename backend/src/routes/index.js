const router = require('express').Router();
const requiredAuth = require('../middlewares/authMw');

router.use('/login', require('./loginRouter'));
router.use('/messages', requiredAuth, require('./messagesRouter'));

module.exports = router;
