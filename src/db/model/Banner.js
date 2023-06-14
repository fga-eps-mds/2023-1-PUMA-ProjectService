/* eslint-disable*/
const { DataTypes } = require('sequelize');
const database = require('../AppDb');

const Banner = database.define('Banner', {
    bannerId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    isEmphasis: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    bannerImage:{
      type: DataTypes.TEXT,
      allowNull: true
    },
    bannerPdf: {
      type: DataTypes.BLOB,
      allowNull: true
    },
}, {
    freezeTableName: true
})

module.exports = Banner