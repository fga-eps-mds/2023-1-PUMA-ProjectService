/* eslint-disable no-multi-str */
const db = require('../../dbconfig/dbConfig');
const sequelize = require('../db/AppDb');
const Subarea = require('../db/model/Subarea');
const Identifies = require('../db/model/Identifies');

module.exports = {
  addSubarea: (input) => new Promise((resolve, reject) => {
    const { knowledgeAreaId, description } = input;
    Subarea.create({
      knowledgeAreaId,
      description,
    }).then((response) => {
      resolve(response);
    }).catch((e) => reject(e));
  }),

  addSubjectSubareaRelation: (input) => new Promise((resolve, reject) => {
    const { subareaid, subjectid } = input;
    Identifies.create({
      subAreaId: subareaid,
      subjectId: subjectid,
    }).then((response) => {
      resolve(response);
    }).catch((e) => reject(e));
  }),

  getSubareas: () => new Promise((resolve, reject) => {
    Subarea.findAll().then((response) => {
      resolve(response);
    }).catch((e) => reject(e));
  }),

  getSubareasOfSubject: (input) => new Promise((resolve, reject) => {
    const { subjectid } = input;
    sequelize.query(
      `select sab."subAreaId", sab.description from "Subject" sb \
      inner join "Identifies" id on sb."subjectId" = id."subjectId" \
      inner join "Subarea" sab on id."subAreaId" = sab."subAreaId" \
      where sb."subjectId" = ${subjectid}`
    ).then((results) => {
      resolve(results);
    }).catch((e) => reject(e));
  }),

  removeSubareasOfSubject: (input) => new Promise((resolve, reject) => {
    const { subjectId } = input;
    sequelize.query(
      `delete from "Identifies" id \
      where id."subjectId" in \
      ( \
        select sb."subjectId" \
        from "Subject" sb \
        inner join "Identifies" id \
        on sb."subjectId" = id."subjectId" \
        where sb."subjectId" = ${subjectId} \
      ) \
      `
    ).then((results) => {
      resolve(results);
    }).catch((e) => reject(e));
  }),
};
