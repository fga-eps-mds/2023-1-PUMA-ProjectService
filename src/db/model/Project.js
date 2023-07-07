const { DataTypes } = require('sequelize');
const database = require('../AppDb');

const Project = database.define('Project', {
    projectId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
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
        references: {
            model: {
                tableName: "Subject",
                schema: "public",
            },
            key: "subjectId"
        },
    },
    semesterId: {
        type: DataTypes.INTEGER,
        references: {
            model: {
                tableName: "Semester",
                schema: "public",
            },
            key: "semesterId"
        },
    },
    name: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    expectedResult: {
        type: DataTypes.STRING(1000),
        allowNull: false
    },
    feedback: {
        type: DataTypes.STRING(1000)
    },
    problem: {
        type: DataTypes.STRING(1000),
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM({
            values: ['SB', 'RL', 'AL', 'AC', 'RC', 'IC', 'EX', 'EC'],
        }),
        allowNull: false
    },
    deleted: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    projectImage:{
        type: DataTypes.TEXT,
        allowNull: true
    },
    projectPdf: {
        type: DataTypes.BLOB,
        allowNull: true
    },
    isBestProject: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
}, {
    freezeTableName: true,
})

module.exports = Project