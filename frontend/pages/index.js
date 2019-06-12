import React, { useEffect } from 'react';
import useAsyncReducer from '../hooks/useAsyncReducer';
import attachDispatchToActions from '../utils/attachDispatchToActions';
import MessageFieldContainer from '../containers/MessageFieldContainer';
import MessageListContainer from '../containers/MessageListContainer';
import conversationsReducer from '../reducers/conversationsReducer';
import conversationsActions from '../actions/conversationsActions';

const Chat = () => {
  const [conversations, dispatch] = useAsyncReducer(conversationsReducer, {});
  const { addConversation, addNewMessage } = attachDispatchToActions(
    conversationsActions,
    dispatch
  );

  useEffect(() => {
    addConversation(1, 2);
  }, []);

  const messages = conversations[2] || [];

  return (
    <main>
      <div>
        <MessageListContainer messages={messages} addNewMessage={addNewMessage} recipient={2} />
        <MessageFieldContainer messages={messages} addNewMessage={addNewMessage} recipient={2} />
      </div>
    </main>
  );
};

Chat.defaultProps = {
  messages: [],
};

export default Chat;
