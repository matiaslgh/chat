import React, { useState, useContext } from 'react';
// import PropTypes from 'prop-types';
import { emitMessage } from '../network/socket';
import MessageField from '../components/MessageField';
import SocketContext from '../context/SocketContext';
import CurrentUserContext from '../context/CurrentUserContext';

const MessageFieldContainer = ({ addNewMessage, recipient }) => {
  const [value, setValue] = useState('');
  const socket = useContext(SocketContext);
  const currentUserId = useContext(CurrentUserContext);

  const handleSubmit = e => {
    e.preventDefault();

    const message = {
      renderId: new Date().getTime(),
      sender: currentUserId,
      recipient,
      content: {
        type: 'text', // TODO: This should not be hard-coded
        text: value,
      },
    };

    emitMessage(socket, message);

    setValue('');
    addNewMessage(recipient, message);
  };

  return (
    <MessageField
      value={value}
      handleSubmit={handleSubmit}
      handleChange={e => {
        setValue(e.target.value);
      }}
    />
  );
};

export default MessageFieldContainer;
