/* eslint-disable*/
const { DataTypes } = require('sequelize');
const database = require('../AppDb');

const Section = database.define('Section', {
    sectionId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    topicId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: {
                tableName: "Topics",
                schema: "public",
            },
            key: "topicId"
        },
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

module.exports = Section