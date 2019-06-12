import React from 'react';
import Message from './Message';

const MessageList = ({ messages }) => (
  <ul>
    {messages.map(message => (
      <Message key={message.id || message.renderId} message={message} />
    ))}
  </ul>
);

export default MessageList;
