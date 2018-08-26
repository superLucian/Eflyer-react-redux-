import React, { Component } from 'react';

export default class LeftPanel extends Component {

  constructor(...args) {
    super(...args);
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    $('#root').toggleClass('sidebar-minified');
  }

  render() {
    return (
      <aside id="left-panel">
        <div className="logo">
          <a href="#/">
            <img src={utils.localImg('/img/logo-white-md.png')}/>
          </a>
        </div>
        <div className="minify-toggle" onClick={this.toggle}>
          <i className="fa fa-arrow-circle-left hit"/>
        </div>

        {this.props.children}
      </aside>
    );
  }
}
