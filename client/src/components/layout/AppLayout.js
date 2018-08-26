import React, { Component } from 'react';
import Notification from '../Notification/Notification';

export default class AppLayout extends Component {
  render() {
    return (
      <div id="root">
        <Notification/>
        {this.props.children}
      </div>
    );
  }
}
