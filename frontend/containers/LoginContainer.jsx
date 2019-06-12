import React, { useContext } from 'react';
import { login } from '../network/api';
import { setCookieAndRedirect } from '../utils/auth';
import Login from '../components/Login';

import CurrentUserContext from '../context/CurrentUserContext';

const LoginContainer = () => {
  const { setCurrentUser } = useContext(CurrentUserContext);

  const onSubmit = async (username, password) => {
    const { token, id } = await login(username, password);
    setCurrentUser({ token, id });
    setCookieAndRedirect({ token });
    // TODO: Use try/catch and handle errors
  };

  return <Login onSubmit={onSubmit} />;
};

export default LoginContainer;
