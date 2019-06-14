import React, { useContext } from 'react';
import CurrentUserContext from '../context/CurrentUserContext';

const Header = () => {
  const { token, id, logout } = useContext(CurrentUserContext);
  const isLoggedIn = token && id;
  return (
    <header>
      {isLoggedIn && (
        <button type="button" onClick={logout}>
          Log out
        </button>
      )}
    </header>
  );
};

Header.propTypes = {};

export default Header;
