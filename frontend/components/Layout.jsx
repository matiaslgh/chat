import React from 'react';
import Head from 'next/head';
import PropTypes from 'prop-types';
import Header from './Header';

const Layout = ({ children }) => (
  <React.Fragment>
    <Head>
      <title>Chat!</title>
    </Head>
    <Header />
    <main>{children}</main>
  </React.Fragment>
);

Layout.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
};

export default Layout;
