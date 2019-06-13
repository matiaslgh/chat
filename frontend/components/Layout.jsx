import React from 'react';
import Head from 'next/head';
import PropTypes from 'prop-types';

const Layout = ({ children }) => (
  <React.Fragment>
    <Head>
      <title>Chat!</title>
    </Head>

    <main>{children}</main>
  </React.Fragment>
);

Layout.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
};

export default Layout;
