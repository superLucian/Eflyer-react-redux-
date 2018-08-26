import React, { Component } from 'react'
import { LeftPanel, Accordion, Section } from 'components/left-panel';

export default class Home extends Component {

  render() {
    return (
      <div id="page-success" className="page responsive animated fadeIn">
        <LeftPanel/>

        <div id="main">
          <div className="contents">
            <div className="message text-center">
              Congratulations!<br/>
              The flyer has been submitted successfully.
            </div>
          </div>
        </div>
      </div>
    );
  }
}
