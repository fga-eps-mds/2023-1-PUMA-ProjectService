/* eslint-disable */
const { DataTypes } = require('sequelize');
const database = require('../AppDb');

const Teacher = database.define('Teacher', {
    userId: {
        type: DataTypes.INTEGER,
        unique: true,
        references: {
          model: {
            tableName: 'Common_User',
            schema: 'public',
          },
          key: 'userId',
        },
      },
      isIdealizer: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      regNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
      },
      status: {
        type: DataTypes.ENUM('PENDENTE', 'ACEITO', 'RECUSADO'),
        defaultValue: 'PENDENTE',
      },
      departament: {
            type: DataTypes.STRING,
            allowNull: false
        },
      course: {
            type: DataTypes.STRING,
            allowNull: false
        },
      university: {
            type: DataTypes.STRING,
            allowNull: false
       },
}, {
    freezeTableName: true
})

module.exports = Teacher;