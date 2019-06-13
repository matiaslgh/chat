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
    const { currentUser, socket } = this.state;

    const isLoggedIn = currentUser.id && currentUser.token;

    if (isLoggedIn && !socket) {
      this.setState({ socket: connect() });
    }

    if (!isLoggedIn && socket) {
      socket.close();
      this.setState({ socket: null });
    }
  }

  componentWillUnmount() {
    const { socket } = this.state;
    if (socket) {
      socket.close();
    }
  }

  setCurrentUser = currentUser => {
    this.setState(old => ({
      socket: old.socket ? old.socket : connect(),
      currentUser: {
        ...currentUser,
        setCurrentUser: this.setCurrentUser,
      },
    }));
  };

  render() {
    const { Component, pageProps } = this.props;
    const contextValue = {
      ...this.state.currentUser,
      setCurrentUser: this.setCurrentUser,
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
