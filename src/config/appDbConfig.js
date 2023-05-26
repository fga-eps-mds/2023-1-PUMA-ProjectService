require('dotenv/config');

const appDbConfig = {
    dialect: 'postgres',
    host: process.env.DB_APP_HOST,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB,
    define: {
        timestamps: true,
        underscored: true,
        underscoredAll: true,
    },
};

module.exports = appDbConfig;