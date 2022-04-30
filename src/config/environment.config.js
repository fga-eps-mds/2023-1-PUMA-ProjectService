// eslint-disable-next-line import/no-unresolved
require('dotenv').config();

module.exports = {
  configEnv: () => {
    console.log('ENVIRONMENT:', process.env.ENVIRONMENT);
    if (process.env.ENVIRONMENT === 'dev') {
      global.URL_API = `http://${process.env.IP_ADDRESS}:3004`;
      global.SECRET = process.env.SECRET;
      global.DB_URL = process.env.DB_URL;
    } else if (process.env.ENVIRONMENT === 'test') {
      global.URL_API = `http://${process.env.IP_ADDRESS}:3004`;
      global.SECRET = process.env.SECRET;
      global.DB_URL = process.env.DB_URL_TEST;
    } else if (process.env.ENVIRONMENT === 'prod') {
      global.URL_API = `http://${process.env.IP_ADDRESS}:3004`;
      global.SECRET = process.env.SECRET_PROD;
      global.DB_URL = process.env.DB_URL;
      console.log('ADRESS', global.URL_API);
      console.log('SECRET', global.SECRET);
      console.log('DB', global.DB_URL);
    }
  },
};
