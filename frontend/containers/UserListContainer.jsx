import React from 'react';
import PropTypes from 'prop-types';
import userType from '../types/userType';
import UserList from '../components/UserList';

const UserListContainer = ({ users }) => {
  // TODO: Add socket logic here to update changes in online/offline users
  return <UserList users={users} />;
};

UserListContainer.propTypes = {
  users: PropTypes.arrayOf(userType),
};

UserListContainer.defaultProps = {
  users: [],
};

export default UserListContainer;
