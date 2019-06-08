const passport = require('passport');
const { Strategy, ExtractJwt } = require('passport-jwt');
const { jwtSecret } = require('../env');

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: jwtSecret,
};

const strategy = new Strategy(opts, (jwt_payload, done) => {
  return done(null, true);
});

passport.use(strategy);

module.exports = passport.authenticate('jwt', { session: false });
