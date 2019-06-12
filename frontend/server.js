const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const next = require('next');

const port = parseInt(process.env.PORT, 10) || 3001;
const dev = process.env.NODE_ENV !== 'production';
const nextApp = next({ dev });
const nextHandler = nextApp.getRequestHandler();

// fake DB
const messages = [];

// socket.io server
io.on('connection', socket => {
  socket.on('message:send', data => {
    console.log('data :', data);
    // TODO: Call API
    // API stores message in db
    // TODO: API adds messages in redis
    // TODO: server listen to redis
    // TODO: server emit message read in redis
    messages.push(data);
    socket.broadcast.emit('message:receive', data);
  });
});

nextApp.prepare().then(() => {
  app.get('/messages', (req, res) => {
    // TODO: Proxy: stream to API
    res.json(messages);
  });

  app.get('*', (req, res) => nextHandler(req, res));

  server.listen(port, err => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
