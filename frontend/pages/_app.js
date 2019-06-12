import App, { Container } from 'next/app';
import React from 'react';
import { connect } from '../network/socket';
import SocketContext from '../SocketContext';

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }

  state = {
    socket: null,
  };

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
    return (
      <Container>
        <SocketContext.Provider value={this.state.socket}>
          <Component {...pageProps} />
        </SocketContext.Provider>
      </Container>
    );
  }
}

export default MyApp;
