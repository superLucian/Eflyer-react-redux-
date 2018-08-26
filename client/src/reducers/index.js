import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
// import { reducer as formReducer } from 'redux-form';
import { requireAll } from '../helpers/utils';

const objModules = { };

// for client browser, use webpack require.context
if (process.env.BROWSER) {
  // require all files in the current directory, except index.js
  const arrModules = requireAll(require.context('.', true, /^((?!index).)*\.js$/));
  arrModules.forEach(module => {
    Object.assign(objModules, module.default);
  });

} else { // for testing on Node.js

  const listModules = require('require-dir')('.');
  Object.keys(listModules).forEach(_key => {
    Object.assign(objModules, listModules[_key].default);
  });
}

// add routerReducer of react-router-redux, and reducer of redux-form
// Object.assign(objModules, { routing, form: formReducer });
Object.assign(objModules, {
  routing: routerReducer,
});

const rootReducer = combineReducers(objModules);

export default rootReducer;
