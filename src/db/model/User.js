const { DataTypes } = require('sequelize');
const database = require('../AppDb');

const User = database.define('User', {
    userId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    userTypeId: {
        type: DataTypes.INTEGER,
        references: {
          model: {
            tableName: "User_Type",
            schema: "public",
          },
          key: "userTypeId"
        },
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    fullName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    passwordHash: {
        type: DataTypes.STRING,
        allowNull: false
    },
    isAdmin: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false
    },
    type: {
        type: DataTypes.ENUM('Pessoa Fisica', 'Pessoa Juridica', 'Aluno', 'Professor'),
        defaultValue: 'Pessoa Fisica',
    },
}, {
    freezeTableName: true
})

module.exports = User