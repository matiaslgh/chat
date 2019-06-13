module.exports = {
  port: process.env.PORT,
  isDev: process.env.NODE_ENV === 'development',
  db: {
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    name: process.env.POSTGRES_DB,
    port: process.env.POSTGRES_PORT,
  },
  jwtSecret: process.env.JWT_SECRET,
  redisUrl: process.env.REDIS_URL,
};
