/* eslint-disable*/
const { DataTypes } = require('sequelize');
const database = require('../AppDb');

const Classes = database.define('Classes', {
    classId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    subjectId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: {
                tableName: "Subject",
                schema: "public",
            },
            key: "subjectId"
        },
    },
    classCode: {
        type: DataTypes.STRING,
        allowNull: false
    },
    year: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    semester: {
        type: DataTypes.ENUM({
            values: ['1', '2', 'VERAO'],
        }),
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    deleted: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
}, {
    freezeTableName: true
})

module.exports = Classes