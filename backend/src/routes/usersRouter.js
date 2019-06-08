const router = require('express').Router();
const controller = require('../controllers/usersController');

router.post('/', controller.createUser);

module.exports = router;
