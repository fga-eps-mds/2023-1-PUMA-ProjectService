const { DataTypes } = require('sequelize');
const database = require('../AppDb');
const sequelize = require('sequelize');

const PartnerProject = database.define('PartnerProject', {
    projectId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    title: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    expectedResult: {
        type: DataTypes.STRING(1000),
        allowNull: false
    },
    problem: {
        type: DataTypes.STRING(1000),
        allowNull: false
    },
    objectives: {
        type: DataTypes.STRING(1000),
        allowNull: false
    },
    projectImages:{
        type: DataTypes.TEXT,
        allowNull: true
    },
    projectPdf: {
        type: DataTypes.BLOB,
        allowNull: true
    },
}, {
    freezeTableName: true,
})

module.exports = PartnerProject