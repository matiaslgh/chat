const { OK, INTERNAL_SERVER_ERROR } = require('http-status-codes');
const { testDbHealth } = require('../models/commonModel');
const log = require('../logger');

async function healthCheck(req, res) {
  try {
    const ok = await testDbHealth();
    if (!ok) {
      throw new Error('Unexpected result when testing db health');
    }
    log.info('The connection with the db is healthy');
    res.status(OK).json({
      health: 'ok',
    });
  } catch (e) {
    log.error('App health is not ok: ', e);
    res.status(INTERNAL_SERVER_ERROR);
  }
}

module.exports = {
  healthCheck,
};
