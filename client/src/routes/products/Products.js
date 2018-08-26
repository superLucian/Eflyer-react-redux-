import React, { Component } from 'react';
import { connect } from 'react-redux';
import { hashHistory } from 'react-router';
import ProductsLeftPanel from './ProductsLeftPanel';
import ProductForm from './ProductForm';
import FlyerProducts from './FlyerProducts';
import { loadFlyer } from 'actions/flyers';

class Products extends Component {

  constructor(...args) {
    super(...args);
    this.onPreviousClick = this.onPreviousClick.bind(this);
    this.onFinishClick = this.onFinishClick.bind(this);
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
    hashHistory.push('/design');
  }

  onFinishClick() {
    hashHistory.push('/review');
  }

  render() {
    const {autosave} = this.props;

    return (
      <div id="page-products" className="page animated fadeIn">
        <ProductsLeftPanel/>

        <div id="main">
          <div className="contents">
            <ProductForm/>
            <div className="separator"/>
            {autosave ? <FlyerProducts/> : null}
          </div>
          <div className="page-actions">
            <button className="btn btn-success btn-previous" onClick={this.onPreviousClick}>PREVIOUS</button>
            <button className="btn btn-primary btn-finish-flyer" onClick={this.onFinishClick}>FINISH FLYER</button>
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
