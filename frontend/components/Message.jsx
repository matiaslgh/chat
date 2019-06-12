import React from 'react';

const Message = ({ message }) => <li key={message.id}>{message.value}</li>;

export default Message;
