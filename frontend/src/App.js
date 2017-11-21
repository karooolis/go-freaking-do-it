import React, { Component } from 'react';

import Background from './Background';
import Main from './Main';
import HowItWorks from './HowItWorks';
import Footer from './Footer';


class App extends Component {
  render() {
    return (
      <div id="wrapper">
        <Background />
        <Main />
        <HowItWorks />
        <Footer />
      </div>
    );
  }
}

export default App;
