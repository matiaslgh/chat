const router = require('express').Router();
const { healthCheck } = require('../controllers/checkController');

// I think it should be a GET. Used POST because of the requirements.
router.post('/', healthCheck);

module.exports = router;
