import React, { useState } from 'react';
import { getMessages } from '../network/api';
import MessageFieldContainer from '../containers/MessageFieldContainer';
import MessageListContainer from '../containers/MessageListContainer';

const Chat = ({ messages: initialMessages }) => {
  const [messages, setMessages] = useState(initialMessages);

  return (
    <main>
      <div>
        <MessageListContainer messages={messages} setMessages={setMessages} />
        <MessageFieldContainer messages={messages} setMessages={setMessages} />
      </div>
    </main>
  );
};

Chat.getInitialProps = () => getMessages();

Chat.defaultProps = {
  messages: [],
};

export default Chat;
