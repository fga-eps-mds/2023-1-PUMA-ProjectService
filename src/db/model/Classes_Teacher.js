/* eslint-disable*/
const { DataTypes } = require('sequelize');
const database = require('../AppDb');

const Classes_Teacher = database.define('Classes_Teacher', {
    classTeacherId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: {
                tableName: "Common_User",
                schema: "public",
            },
            key: "userId"
        },
    },
    classId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: {
                tableName: "Classes",
                schema: "public",
            },
            key: "classId"
        },
    },
}, {
    freezeTableName: true
})

module.exports = Classes_Teacher