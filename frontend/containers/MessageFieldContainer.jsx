import React, { useState, useContext } from 'react';
// import PropTypes from 'prop-types';
import { emitMessage } from '../network/socket';
import MessageField from '../components/MessageField';
import SocketContext from '../SocketContext';

const MessageFieldContainer = ({ messages, addNewMessage, recipient }) => {
  const [value, setValue] = useState('');
  const socket = useContext(SocketContext);

  const handleSubmit = e => {
    e.preventDefault();

    const message = {
      id: new Date().getTime(),
      value,
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
