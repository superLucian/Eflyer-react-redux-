import React, { Component } from 'react';
import Loading from 'react-loading';
import BasePage from 'components/layout/BasePage';
import Footer from 'components/layout/Footer';

export default class LoadingScreen extends Component {
  render() {
    return (
      <BasePage>
        <div id="page-loading" className="page">
          <div className="contents">
            <div className="logo">
              <img src={utils.localImg('/img/logo-blue-md.png')} alt="E-Flyer"/>
              <h1>Welcome to E-Flyer!</h1>
            </div>
            <Loading type="spin"className="spinner"/>
          </div>
        </div>
        <Footer/>
      </BasePage>
    );
  }
}
