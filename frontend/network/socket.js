import io from 'socket.io-client';

export const connect = () => io();

export const emitMessage = (socket, message) => {
  socket.emit('message:send', message);
};

export const onReceiveMessage = (socket, cb) => {
  socket.on('message:receive', cb);
};
