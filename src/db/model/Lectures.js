const { DataTypes } = require('sequelize');
const database = require('../AppDb');

const Lectures = database.define('Lectures', {
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: {
                tableName: "User",
                schema: "public",
            },
            key: "userId"
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