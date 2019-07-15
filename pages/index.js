import React from 'react';

import IndexComponent from '../components/index';

class Index extends React.Component {
  static async getInitialProps(context) {
    console.log('context', context);
    return {
    };
  }

  render() {
    return <IndexComponent />;
  }
}

export default Index;
