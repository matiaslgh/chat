const router = require('express').Router();
const { createMessage, getMessages } = require('../controllers/messagesController');

router.get('/', getMessages);

router.post('/', createMessage);

module.exports = router;
