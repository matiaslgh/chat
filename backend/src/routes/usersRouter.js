const router = require('express').Router();
const controller = require('../controllers/usersController');
const requiredAuth = require('../middlewares/authMw');

router.get('/', requiredAuth, controller.getUsers);
router.post('/', controller.createUser);

module.exports = router;
