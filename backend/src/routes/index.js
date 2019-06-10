const router = require('express').Router();
const requiredAuth = require('../middlewares/authMw');

router.use('/check', require('./checkRouter'));
router.use('/login', require('./loginRouter'));
// TODO: Create logout
router.use('/messages', requiredAuth, require('./messagesRouter'));
router.use('/users', require('./usersRouter'));

module.exports = router;
