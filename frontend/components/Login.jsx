import React, { useState } from 'react';
import PropTypes from 'prop-types';

const Login = ({ onSubmit }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(username, password);
  };
  // TODO: Show errors
  // TODO: Validate
  return (
    <form onSubmit={handleSubmit}>
      Username:
      <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
      <br />
      Password:
      <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
      <br />
      <button type="submit">Submit</button>
    </form>
  );
};

Login.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Login;
