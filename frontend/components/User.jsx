import React from 'react';
import Link from 'next/link';
import userType from '../types/userType';

const User = ({ user }) => (
  <div>
    <Link href={`/user/${user.id}`}>
      <a>{user.username}</a>
    </Link>
    {user.isOnline && 'online'}
  </div>
);

User.propTypes = {
  user: userType.isRequired,
};

export default User;
