import React, { Component } from 'react';

export default class NotFound extends Component {
  render() {
    return (
      <div id="page-not-found" className="page">
        <div className="contents">
          <div className="logo">
            <img src={utils.localImg('/img/logo-blue-md.png')} alt="E-Flyer"/>
          </div>
          <h1 className="margin-top-50">Sorry, there&apos;s nothing in here. <a href="#/">Go to homepage</a></h1>
        </div>
      </div>
    );
  }
}
