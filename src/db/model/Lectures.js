const { DataTypes } = require('sequelize');
const database = require('../AppDb');

const Lectures = database.define('Lectures', {
    regNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
            model: {
                tableName: "User_Properties",
                schema: "public",
            },
            key: "regNumber"
        },
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
}, {
    freezeTableName: true
})

module.exports = Lectures