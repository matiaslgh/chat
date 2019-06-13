const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const next = require('next');
const redis = require('redis');
const cookie = require('cookie');
const { redisUrl } = require('./env');
const routes = require('./routes');

const redisClient = redis.createClient(redisUrl);

const port = parseInt(process.env.PORT, 10) || 3001;
const dev = process.env.NODE_ENV !== 'production';
const nextApp = next({ dev });
const nextHandler = routes.getRequestHandler(nextApp);

io.on('connection', socket => {
  const { userId, token } = cookie.parse(socket.handshake.headers.cookie);

  // TODO: Check in redis if that info is valid.. if not, force disconnection
  if (!userId || !token) {
    return;
  }

  socket.join(userId);
  redisClient.subscribe(userId);

  socket.on('disconnect', () => {
    console.log('disconnect');
    // TODO: redis unsubscribe if there are not more connections for the same user
  });
});

redisClient.on('message', (channel, message) => {
  const parsedMsg = JSON.parse(message);
  const { recipient } = parsedMsg;
  io.sockets.in(recipient).emit('new_msg', parsedMsg);
});

nextApp.prepare().then(() => {
  app.get('*', (req, res) => nextHandler(req, res));

  server.listen(port, err => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
