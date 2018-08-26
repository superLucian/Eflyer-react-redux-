import React, { Component } from 'react';
import Footer from 'components/layout/Footer';

export default class BasePage extends Component {
  render() {
    return (
      <div id="root" className="base">
        {this.props.children}
        <Footer/>
      </div>
    );
  }
}
