import App, { Container } from 'next/app';
import React from 'react';
import { connect } from '../network/socket';
import SocketContext from '../context/SocketContext';
import CurrentUserContext from '../context/CurrentUserContext';
import { getCurrentUser } from '../utils/auth';

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};

    const currentUser = getCurrentUser(ctx);

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps, currentUser };
  }

  constructor({ currentUser }) {
    super();
    this.state = {
      socket: null,
      currentUser: currentUser || {},
    };
  }

  componentDidMount() {
    // connect to WS server and listen event
    const socket = connect();
    this.setState({ socket });
  }

  // close socket connection
  componentWillUnmount() {
    this.state.socket.close();
  }

  render() {
    const { Component, pageProps } = this.props;
    const setCurrentUser = currentUser =>
      this.setState({ currentUser: { ...currentUser, setCurrentUser } });
    const contextValue = {
      ...this.state.currentUser,
      setCurrentUser,
    };
    return (
      <Container>
        <SocketContext.Provider value={this.state.socket}>
          <CurrentUserContext.Provider value={contextValue}>
            <Component {...pageProps} />
          </CurrentUserContext.Provider>
        </SocketContext.Provider>
      </Container>
    );
  }
}

export default MyApp;
