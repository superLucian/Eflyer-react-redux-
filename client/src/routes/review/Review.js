import React, { Component } from 'react';
import { connect } from 'react-redux';
import { hashHistory } from 'react-router';
import { LeftPanel, Accordion, Section } from 'components/left-panel';
import { loadFlyer, submitFlyer } from 'actions/flyers';
import { showNotification } from 'actions/notifications';

class Products extends Component {

  constructor(...args) {
    super(...args);
    this.onPreviousClick = this.onPreviousClick.bind(this);
    this.onSubmitClick = this.onSubmitClick.bind(this);
  }

  componentWillMount() {
    const {dispatch, autosave} = this.props;
    if (!autosave) {
      dispatch(loadFlyer()).then(response => {
        response || hashHistory.push('/home');
      }).catch(() => {
        hashHistory.push('/home');
      });
    }
  }

  onPreviousClick() {
    hashHistory.push('/products');
  }

  onSubmitClick() {
    const {dispatch} = this.props;
    dispatch(submitFlyer('/success')).catch(() => {
      dispatch(showNotification('Failed to submit flyer.', 'fail'));
    });
  }

  render() {
    return (
      <div id="page-review" className="page responsive animated fadeIn">
        <LeftPanel>
          <Accordion>
            <Section title="REVIEW FLYER" collapsible={false}/>
          </Accordion>
        </LeftPanel>

        <div id="main">
          <div className="contents">
            Preview of finished flyer
          </div>
          <div className="page-actions">
            <button className="btn btn-success btn-previous" onClick={this.onPreviousClick}>PREVIOUS</button>
            <button className="btn btn-primary btn-submit-flyer" onClick={this.onSubmitClick}>SUBMIT FLYER</button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  autosave: _.get(state, 'flyers.autosave')
});

export default connect(mapStateToProps)(Products);
