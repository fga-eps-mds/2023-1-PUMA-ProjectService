/* eslint-disable no-multi-str */
const db = require('../../dbconfig/dbConfig');
const Lectures = require('../db/model/Lectures');
const sequelize = require('../db/AppDb');

module.exports = {
  addProfessorSubjectRelation: (input) => new Promise((resolve, reject) => {
    const { regnumber, subjectid } = input;
    Lectures.create({
      regNumber: regnumber,
      subjectId: subjectid,
    }).then((response) => {
      resolve(response);
    })
      .catch((e) => reject(e));
  }),

  getProfessors: () => new Promise((resolve, reject) => {
    sequelize.query(
      'Select pf."regNumber", pf."userId", us."fullName", us.email, us."image" from "User_Properties" pf left join "User" us on pf."userId" = us."userId";',
    ).then((results) => {
      resolve(results[0]);
    }).catch((e) => reject(e));
  }),

  getProfessorsofSubject: (input) => new Promise((resolve, reject) => {
    const { subjectid } = input;
    sequelize.query(
      `select pf."regNumber", pf."userId", us."fullName", us.email, us."image" from "Subject" sb \
      inner join "Lectures" lt on sb."subjectId" = lt."subjectId" \
      inner join "User_Properties" pf on lt."regNumber" = pf."regNumber" \
      left join "User" us on pf."userId" = us."userId" \
      where sb."subjectId" = ${subjectid}`
    ).then((results) => {
      resolve(results);
    }).catch((e) => {
      console.log(e);
      reject(e);
    });
  }),

  removeProfessorsofSubject: (input) => new Promise((resolve, reject) => {
    const { subjectId } = input;
    sequelize.query(
      `delete from "Lectures" lt \
      where lt."subjectId" in \
      ( \
        select sb."subjectId" \
        from "Subject" sb \
        inner join "Lectures" lt \
        on sb."subjectId" = lt."subjectId" \
        where sb."subjectId" = ${subjectId} \
      )`
    ).then((results) => {
      resolve(results);
    }).catch((e) => reject(e));
  }),
};
