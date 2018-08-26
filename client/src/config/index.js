const defaultConfig = require('./config.default').default;

let envConfig;

switch (process.env.NODE_ENV) {
  case 'production':
    envConfig = require('./config.prod').default; break;
  default:
    envConfig = require('./config.dev').default;
}

export default Object.assign({}, defaultConfig, envConfig);
