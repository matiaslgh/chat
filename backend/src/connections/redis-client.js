const redis = require('redis');
const { redisUrl } = require('../env');
const client = redis.createClient(redisUrl);

module.exports = client;
