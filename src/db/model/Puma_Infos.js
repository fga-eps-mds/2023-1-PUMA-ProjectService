/* eslint-disable*/
const { DataTypes } = require('sequelize');
const database = require('../AppDb');

const Puma_Infos = database.define('Puma_Infos',{
    infoId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    titleDescription: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    titleGoal: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    goal: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    titleMethodology: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    methodology: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    titleTeachers: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    descriptionImage:{
        type: DataTypes.TEXT,
        allowNull: true
    },
    methodologyImage:{
        type: DataTypes.TEXT,
        allowNull: true
    },
    goalImage:{
        type: DataTypes.TEXT,
        allowNull: true
    },
}, {
    freezeTableName: true
})

module.exports = Puma_Infos