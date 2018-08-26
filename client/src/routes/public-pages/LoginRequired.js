import React, { Component } from 'react';

export default class LoginRequired extends Component {
  render() {
    return (
      <div id="page-login-required" className="page">
        <div className="contents">
          <div className="logo">
            <img src={utils.localImg('/img/logo-blue-md.png')} alt="E-Flyer"/>
          </div>
          <div className="alert-danger margin-top-50 padding-20">
            <h3>You should login to use this application.</h3>
          </div>
        </div>
      </div>
    );
  }
}
