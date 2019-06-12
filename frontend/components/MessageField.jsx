import React from 'react';
import PropTypes from 'prop-types';

const MessageField = ({ value, handleSubmit, handleChange }) => (
  <form onSubmit={e => handleSubmit(e)}>
    <input onChange={handleChange} type="text" placeholder="Hello world!" value={value} />
    <button type="submit">Send</button>
  </form>
);

MessageField.propTypes = {
  value: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default MessageField;
