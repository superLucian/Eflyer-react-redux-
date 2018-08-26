import { requireAll } from '../helpers/utils';

const objModules = { };

// for client browser, use webpack require.context
if (process.env.BROWSER) {
  // require all files in the current directory, except index.js
  const arrModules = requireAll(require.context('.', true, /^((?!index).)*\.js$/));
  arrModules.forEach(module => {
    Object.assign(objModules, module);
  });

} else { // for testing on Node.js

  const listModules = require('require-dir')('.');
  Object.keys(listModules).forEach(_key => {
    Object.assign(objModules, listModules[_key]);
  });
}

export default objModules;
