/* eslint-disable*/
const { DataTypes } = require('sequelize');
const database = require('../AppDb');

const Topics = database.define('Topics', {
    topicId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },

    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },

}, {
    freezeTableName: true
})

module.exports = Topics