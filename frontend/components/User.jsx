import React from 'react';
import userType from '../types/userType';

const User = ({ user }) => (
  <div>
    <div>
      User
      {user.username}
    </div>
    {user.isOnline && 'online'}
  </div>
);

User.propTypes = {
  user: userType.isRequired,
};

export default User;
