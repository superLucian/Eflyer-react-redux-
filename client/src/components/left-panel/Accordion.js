import React, { Component } from 'react';

export default class Accordion extends Component {

  render() {
    return (
      <div className="accordion">
        {this.props.children}
      </div>
    );
  }
}
