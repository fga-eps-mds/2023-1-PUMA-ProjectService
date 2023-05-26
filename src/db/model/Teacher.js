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
    image: {
        type: DataTypes.TEXT,
    }
}, {
    freezeTableName: true
})

module.exports = Teacher;