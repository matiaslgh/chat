import React, { useState, useEffect, useContext } from 'react';
import { onReceiveMessage } from '../network/socket';
import SocketContext from '../SocketContext';
import MessageList from '../components/MessageList';

const MessageListContainer = ({ messages, setMessages }) => {
  const [subscribed, setSubscribed] = useState(false);
  const socket = useContext(SocketContext);

  const handleMessage = message => {
    setMessages(messages.concat(message));
  };

  const subscribe = () => {
    if (socket && !subscribed) {
      onReceiveMessage(socket, handleMessage);
      setSubscribed(true);
    }
  };

  useEffect(() => {
    subscribe();
  });

  return <MessageList messages={messages} />;
};

export default MessageListContainer;
