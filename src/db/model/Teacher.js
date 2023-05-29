/* eslint-disable */
const { DataTypes } = require('sequelize');
const database = require('../AppDb');

const Teacher = database.define('Teacher', {
    userId: {
        type: DataTypes.INTEGER,
        unique: true,
        references: {
            model: {
                tableName: "Common_User",
                schema: "public",
            },
            key: "userId"
        },
    },
    regNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true
    },
    isIdealizer: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    status: {
        type: DataTypes.ENUM('PENDENTE', 'ACEITO', 'RECUSADO'),
        defaultValue: 'PENDENTE',
    }
}, {
    freezeTableName: true
})

module.exports = Teacher;