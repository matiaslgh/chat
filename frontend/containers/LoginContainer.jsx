import React, { useContext } from 'react';
import Router from 'next/router';
import { login } from '../network/api';
import { setCookies } from '../utils/browser';
import Login from '../components/Login';

import CurrentUserContext from '../context/CurrentUserContext';

const LoginContainer = () => {
  const { setCurrentUser } = useContext(CurrentUserContext);

  const onSubmit = async (username, password) => {
    try {
      const { token, id } = await login(username, password);
      setCookies({ token, userId: id });
      setCurrentUser({ token, id });
      Router.push('/');
    } catch (e) {
      // TODO: handle error
      console.log('e :', e);
    }
  };

  return <Login onSubmit={onSubmit} />;
};

export default LoginContainer;
