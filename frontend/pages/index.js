import React, { useEffect, useContext } from 'react';
import useAsyncReducer from '../hooks/useAsyncReducer';
import attachDispatchToActions from '../utils/attachDispatchToActions';
import conversationsReducer from '../reducers/conversationsReducer';
import conversationsActions from '../actions/conversationsActions';
import CurrentUserContext from '../context/CurrentUserContext';
import MessageFieldContainer from '../containers/MessageFieldContainer';
import MessageListContainer from '../containers/MessageListContainer';

const Chat = () => {
  const [conversations, dispatch] = useAsyncReducer(conversationsReducer, {});
  const { addConversation, addNewMessage } = attachDispatchToActions(
    conversationsActions,
    dispatch
  );
  const { id: currentUserId } = useContext(CurrentUserContext);

  useEffect(() => {
    addConversation(currentUserId, 2);
  }, []);

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

export default Chat;
