const { INTERNAL_SERVER_ERROR } = require('http-status-codes');
const log = require('../logger');

/**
 * Any unhandled error will be caught and handled by this middleware
 */
// eslint-disable-next-line no-unused-vars
const globalErrorHandlerMiddleware = (err, req, res, next) => {
  log.error(err);
  res.status(INTERNAL_SERVER_ERROR).send({
    message: 'Something went wrong.',
  });
};

module.exports = globalErrorHandlerMiddleware;
