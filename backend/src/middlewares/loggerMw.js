const logger = require('../logger');
const { isDev } = require('../env');

const devLoggerMiddleware = (req, res, next) => {
  logger.info(`${req.method} ${req.originalUrl}`);
  next();
};

const prodLoggerMiddleware = require('express-pino-logger')({
  logger,
});

module.exports = isDev ? devLoggerMiddleware : prodLoggerMiddleware;
