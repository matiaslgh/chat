import React from 'react';
import PropTypes from 'prop-types';
import userType from '../types/userType';
import User from './User';

const UserList = ({ users }) => users.map(user => <User key={user.id} user={user} />);

UserList.propTypes = {
  users: PropTypes.arrayOf(userType),
};

UserList.defaultProp = {
  users: [],
};

export default UserList;
