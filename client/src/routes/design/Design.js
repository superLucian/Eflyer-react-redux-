import React, { Component } from 'react';
import { connect } from 'react-redux';
import { hashHistory } from 'react-router';
import DesignLeftPanel from './DesignLeftPanel';
import { loadFlyer, saveFlyer, submitFlyer } from 'actions/flyers';
import { showNotification } from 'actions/notifications';

class Design extends Component {

  constructor(...args) {
    super(...args);
    this.doAutosave = this.doAutosave.bind(this);
    this.onProductsClick = this.onProductsClick.bind(this);
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

    setTimeout(this.doAutosave, consts.AUTOSAVE_INTERVAL);
  }

  onSubmitClick() {
    const {dispatch} = this.props;
    dispatch(submitFlyer('/success')).catch(() => {
      dispatch(showNotification('Failed to submit flyer.', 'fail'));
    });
  }

  onProductsClick() {
    hashHistory.push('/products');
  }

  doAutosave() {
    const {dispatch, autosave, changed, saveFlyerApi, form} = this.props;

    if (autosave && saveFlyerApi.status !== consts.API_LOADING && changed) {
      // flyer has been loaded && not in the middle of auto-saving && flyer has been changed since last save
      dispatch(saveFlyer(form)).then(() => {
        dispatch(showNotification('Flyer saved.'));
      }).catch(() => {
        dispatch(showNotification('Failed to save flyer.', 'fail'));
      });
    }

    setTimeout(this.doAutosave, consts.AUTOSAVE_INTERVAL);
  }

  render() {
    const {step1Action} = this.props;

    return (
      <div id="page-design" className="page animated fadeIn">
        <DesignLeftPanel/>

        <div id="main">
          <div className="contents">
            &nbsp;
          </div>
          {
            step1Action === 'USE_PREVIOUS_FLYER' ?
              <div className="page-actions">
                <button className="btn btn-primary btn-submit-flyer" onClick={this.onSubmitClick}>SUBMIT FLYER</button>
                <button className="btn btn-success btn-edit-products" onClick={this.onProductsClick}>EDIT PRODUCTS</button>
              </div>
              :
              <div className="page-actions">
                <button className="btn btn-info btn-add-products" onClick={this.onProductsClick}>ADD PRODUCTS</button>
              </div>
          }
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  autosave: _.get(state, 'flyers.autosave'),
  form: _.get(state, 'flyers.form'),
  changed: _.get(state, 'flyers.changed'),
  saveFlyerApi: _.get(state, 'flyers.saveFlyerApi'),
  step1Action: _.get(state, 'flyers.step1Action')
});

export default connect(mapStateToProps)(Design);
