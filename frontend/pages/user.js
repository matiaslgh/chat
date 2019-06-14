import React from 'react';
import PropTypes from 'prop-types';
import useAsyncReducer from '../hooks/useAsyncReducer';
import attachDispatchToActions from '../utils/attachDispatchToActions';
import { auth } from '../utils/auth';
import { redirect } from '../utils/isomorphic';
import { getMessages, getUsers } from '../network/api';
import types from '../types';
import conversationsReducer from '../reducers/conversationsReducer';
import conversationsActions from '../actions/conversationsActions';
import MessageFieldContainer from '../containers/MessageFieldContainer';
import MessageListContainer from '../containers/MessageListContainer';
import UserListContainer from '../containers/UserListContainer';
import Layout from '../components/Layout';

const Chat = ({ users, messages, recipient }) => {
  const initialConvs = { [recipient]: messages };
  const [conversations, dispatch] = useAsyncReducer(conversationsReducer, initialConvs);
  const { addNewMessage } = attachDispatchToActions(conversationsActions, dispatch);

  const stateMessages = conversations[recipient];

  return (
    <Layout>
      <UserListContainer users={users} recipient={recipient} conversations={conversations} />
      <MessageListContainer
        messages={stateMessages}
        addNewMessage={addNewMessage}
        recipient={recipient}
      />
      <MessageFieldContainer addNewMessage={addNewMessage} recipient={recipient} />
    </Layout>
  );
};

Chat.getInitialProps = async ctx => {
  const token = auth(ctx);

  const { query } = ctx;
  const recipient = parseInt(query.id, 10);

  if (!recipient) {
    redirect('/', ctx);
  }

  try {
    const [users, { messages }] = await Promise.all([
      getUsers(token),
      getMessages(token, recipient),
    ]);

    return {
      users,
      messages,
      recipient,
    };
  } catch (e) {
    // TODO: show error message (something global)
    redirect('/', ctx);
    return null;
  }
};

Chat.propTypes = {
  users: PropTypes.arrayOf(types.userType).isRequired,
  messages: PropTypes.arrayOf(types.messageType).isRequired,
  recipient: PropTypes.number.isRequired,
};

export default Chat;
