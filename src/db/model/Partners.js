/* eslint-disable*/
const { DataTypes } = require('sequelize');
const database = require('../AppDb');

const Partners = database.define('Partners', {
    partnerId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    enterpriseLogo: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    projectName: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    projectDescription: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    projectImages: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    showOnHome: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    }

}, {
    freezeTableName: true
})

module.exports = Partners