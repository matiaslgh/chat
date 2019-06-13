import React, { useState, useContext } from 'react';
import MessageField from '../components/MessageField';
import CurrentUserContext from '../context/CurrentUserContext';
import { sendMessage } from '../network/api';

const MessageFieldContainer = ({ addNewMessage, recipient }) => {
  const [value, setValue] = useState('');
  const { id: currentUserId, token } = useContext(CurrentUserContext);

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

    sendMessage(token, message);

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
