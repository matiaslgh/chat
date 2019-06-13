import React, { useContext } from 'react';
import { login } from '../network/api';
import { setCookieAndRedirect } from '../utils/auth';
import Login from '../components/Login';

import CurrentUserContext from '../context/CurrentUserContext';

const LoginContainer = () => {
  const { setCurrentUser } = useContext(CurrentUserContext);

  const onSubmit = async (username, password) => {
    try {
      const { token, id } = await login(username, password);
      setCurrentUser({ token, id });
      setCookieAndRedirect({ token, userId: id });
    } catch (e) {
      // TODO: handle error
      console.log('e :', e);
    }
  };

  return <Login onSubmit={onSubmit} />;
};

export default LoginContainer;
