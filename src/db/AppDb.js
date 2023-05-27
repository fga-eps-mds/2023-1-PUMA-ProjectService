const { Sequelize } = require('sequelize');
const script = require('../utils/populaPumaInfo');
const appDbConfig = require('../config/appDbConfig');

let sequelize;

if (process.env.ENVIRONMENT === 'hom') {
  sequelize = new Sequelize(appDbConfig.database, appDbConfig.username, appDbConfig.password, {
    host: appDbConfig.host,
    dialect: appDbConfig.dialect,
    query: { raw: true },
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  });
  sequelize.query(script);
} else {
  sequelize = new Sequelize(appDbConfig.database, appDbConfig.username, appDbConfig.password, {
    host: appDbConfig.host,
    dialect: appDbConfig.dialect,
    query: { raw: true },
  });
  sequelize.query(script);
}

module.exports = sequelize;
