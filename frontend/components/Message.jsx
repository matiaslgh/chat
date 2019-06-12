import React from 'react';

const Message = ({ message }) => <li key={message.id}>{message.content.text}</li>;

export default Message;
