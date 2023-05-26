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
        type: DataTypes.TEXT,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    },
}, {
    freezeTableName: true
})

module.exports = Topics