import React, { Component } from 'react';

export default class SessionExpired extends Component {

  constructor(...args) {
    super(...args);
    this.onReauthenticateClick = this.onReauthenticateClick.bind(this);
  }

  onReauthenticateClick() {
    window.location.href = config.APP_BASE_URL;
  }

  render() {
    return (
      <div id="page-session-expired" className="page animated bounceIn">
        <div className="contents">
          <div className="logo">
            <img src={utils.localImg('/img/logo-blue-md.png')} alt="E-Flyer"/>
          </div>
          <div className="alert-danger margin-top-50 padding-20">
            <h3>Session has been expired. Re-authentication is needed.</h3>
            <button className="btn btn-default btn-lg" onClick={this.onReauthenticateClick}>Re-authenticate</button>
          </div>
        </div>
      </div>
    );
  }
}
