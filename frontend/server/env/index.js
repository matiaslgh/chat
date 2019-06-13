module.exports = {
  port: process.env.PORT,
  isProd: process.env.NODE_ENV !== 'production',
  redisUrl: process.env.REDIS_URL || 'redis://localhost:6379',
};
