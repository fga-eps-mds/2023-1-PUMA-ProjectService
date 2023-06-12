const { DataTypes } = require('sequelize');
const database = require('../AppDb');

const User_Type = database.define('User_Type', {
    userTypeId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    typeName: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    canEditExternalEnvironment: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
    canCreateDiscipline: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
    canAcceptTeacher: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
    canRevokeUserType: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
    canGiveUserType: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
    canEditPermission: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
    canDeleteUserType: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
}, {
    freezeTableName: true
})

module.exports = User_Type