import io from 'socket.io-client';

export const connect = () => io();

export const onReceiveMessage = (socket, cb) => {
  socket.on('new_msg', cb);
};
