import React from 'react';
import useAsyncReducer from '../hooks/useAsyncReducer';
import attachDispatchToActions from '../utils/attachDispatchToActions';
import { auth } from '../utils/auth';
import { getMessages } from '../network/api';
import conversationsReducer from '../reducers/conversationsReducer';
import conversationsActions from '../actions/conversationsActions';
import MessageFieldContainer from '../containers/MessageFieldContainer';
import MessageListContainer from '../containers/MessageListContainer';

const Chat = ({ initialConversations }) => {
  const [conversations, dispatch] = useAsyncReducer(conversationsReducer, initialConversations);
  const { addNewMessage } = attachDispatchToActions(conversationsActions, dispatch);

  const messages = conversations[2] || [];

  return (
    <main>
      <div>
        <MessageListContainer messages={messages} addNewMessage={addNewMessage} recipient={2} />
        <MessageFieldContainer addNewMessage={addNewMessage} recipient={2} />
      </div>
    </main>
  );
};

Chat.getInitialProps = async ctx => {
  const token = auth(ctx);
  // TODO: handle errors
  const { messages } = await getMessages(token, 2, 0);
  return {
    initialConversations: {
      2: messages,
    },
  };
};

Chat.defaultProps = {
  initialConversations: {},
};

export default Chat;
