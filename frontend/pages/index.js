import React from 'react';
import PropTypes from 'prop-types';
import { getUsers } from '../network/api';
import { auth } from '../utils/auth';
import userType from '../types/userType';
import Layout from '../components/Layout';
import UserListContainer from '../containers/UserListContainer';
import Welcome from '../components/Welcome';

const WelcomePage = ({ users }) => (
  <Layout>
    <UserListContainer users={users} />
    <Welcome />
  </Layout>
);

WelcomePage.getInitialProps = async ctx => {
  const token = auth(ctx);

  try {
    const users = await getUsers(token);
    return { users };
  } catch (e) {
    // TODO: show error message (something global)
    return {};
  }
};

WelcomePage.propTypes = {
  users: PropTypes.arrayOf(userType).isRequired,
};

export default WelcomePage;
