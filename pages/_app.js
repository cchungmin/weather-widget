import React from 'react';
import App, { Container } from 'next/app';
import { Provider } from 'react-redux';

import configureStore from '../configureStore';

const store = configureStore();

class MainApp extends App {
  static async getInitialProps({ Component, ctx }) {
    const pageProps = Component.getInitialProps
      ? await Component.getInitialProps(ctx) : {};

    return { pageProps };
  }

  render() {
    const { Component, pageProps } = this.props;

    return (
      <Container>
        <Provider store={store}>
          <Component {...pageProps} />
        </Provider>
      </Container>
    );
  }
}

export default MainApp;
