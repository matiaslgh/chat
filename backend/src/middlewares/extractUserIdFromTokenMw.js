const { ExtractJwt } = require('passport-jwt');
const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../env');

/**
 * Extract the user id from the token if it exists and add it
 * into the request object as userId to use it in next middlewares
 */
const extractUserIdFromTokenMiddleware = (req, res, next) => {
  const token = ExtractJwt.fromAuthHeaderAsBearerToken()(req);
  if (token) {
    try {
      const { id } = jwt.verify(token, jwtSecret);
      req.userId = id;
    } catch (e) {
      // ignore
    }
  }
  next();
};

module.exports = extractUserIdFromTokenMiddleware;
