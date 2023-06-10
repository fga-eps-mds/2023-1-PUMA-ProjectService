/* eslint-disable*/
const { DataTypes } = require('sequelize');
const database = require('../AppDb');

const Partners = database.define('Partners', {
    partnerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    cnpj: {
        type: DataTypes.STRING,
        allowNull: false
    },
    enterpriseLogo: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    socialReason: {
        type: DataTypes.STRING,
        allowNull: true,
    },

}, {
    freezeTableName: true
})

module.exports = Partners