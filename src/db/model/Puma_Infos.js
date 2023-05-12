const { DataTypes } = require('sequelize');
const database = require('../AppDb');

const Puma_Infos = database.define('Puma_Infos',{
    infoId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    goal: {
        type: DataTypes.STRING,
        allowNull: false
    },
    methodology: {
        type: DataTypes.STRING,
        allowNull: false
    },
    methodologyImage:{
        type: DataTypes.TEXT,
        allowNull: true
    },
    goalImage:{
        type: DataTypes.TEXT,
        allowNull: true
    },

    freezeTableName: true
})

module.exports = Puma_Infos