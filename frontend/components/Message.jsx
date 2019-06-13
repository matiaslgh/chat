import React from 'react';
import messageType from '../types/messageType';

const Message = ({ message }) => (
  <li key={message.id}>
    <div>{message.sender}:</div>
    <div>{message.content.text}</div>
  </li>
);

Message.propTypes = {
  message: messageType.isRequired,
};

export default Message;
