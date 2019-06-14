import React from 'react';
import LoginContainer from '../containers/LoginContainer';
import Layout from '../components/Layout';
import { getCurrentUser } from '../utils/auth';
import { redirect } from '../utils/isomorphic';

const Login = () => (
  <Layout>
    <LoginContainer />
  </Layout>
);

Login.getInitialProps = ctx => {
  const currentUser = getCurrentUser(ctx);
  if (currentUser) {
    redirect('/', ctx);
  }
};

export default Login;
