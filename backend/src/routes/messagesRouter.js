const router = require('express').Router();
const { createMessage } = require('../controllers/messagesController');

router.get('/', (req, res) => {
  return res.json({
    messages: [
      {
        id: 0,
        timestamp: '2018-07-07T02:59:21Z',
        sender: 0,
        recipient: 0,
        content: {
          type: 'string',
          text: 'string',
        },
      },
    ],
  });
});

router.post('/', createMessage);

module.exports = router;
