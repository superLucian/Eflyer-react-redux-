import React from 'react';
import { connect } from 'react-redux';
import Routes from './routes';
import LoadingScreen from './routes/public-pages/LoadingScreen';

const App = ({ history, checkUserApi }) => {
  return checkUserApi.status === consts.API_LOADING ?
    <LoadingScreen />
    :
    <Routes history={history} />;
};

const mapStateToProps = (state) => ({
  checkUserApi: _.get(state, 'auth.checkUserApi')
});

export default connect(mapStateToProps)(App);
