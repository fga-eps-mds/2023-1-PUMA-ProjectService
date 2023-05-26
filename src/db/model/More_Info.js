/* eslint-disable camelcase */
const { DataTypes } = require('sequelize');
const database = require('../AppDb');

const More_Info = database.define('More_Info', {
  moreInfoId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  infoId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: {
        tableName: 'Puma_Infos',
        schema: 'public',
      },
      key: 'infoId',
    },
  },
  title: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
}, {
  freezeTableName: true,
});

module.exports = More_Info;
