const db = require('../../dbconfig/dbConfig');
const sequelize = require('../db/AppDb');
const Subject = require('../db/model/Subject');

module.exports = {
  addSubject: (input) => new Promise((resolve, reject) => {
    const { name, courseSyllabus, image } = input;
    Subject.create({
      name,
      courseSyllabus,
      image,
    }).then((response) => {
      resolve(response);
    }).catch((e) => reject(e));
  }),

  getSubjects: () => new Promise((resolve, reject) => {
    Subject.findAll({
      where:{
        deleted: false,
      },
      order: [['subjectId', 'DESC']]
    }).then((response) => {
      resolve(response);
    }).catch((e) => reject(e));
  }),

  getSubject: (input) => new Promise((resolve, reject) => {
    const { subjectid } = input;
    Subject.findOne({
      where: {
        subjectId: subjectid,
      }
    }).then((response) => {
        resolve(response);
      }).catch((response) => {
        reject(response);
      });
  }),

  updateSubject: (input) => new Promise((resolve, reject) => {
    const { subjectId, name, courseSyllabus, image } = input;
    Subject.update({
      name,
      courseSyllabus,
      image,
    }, {
      where: {
        subjectId,
      }
    }).then((response) => {
        resolve(response);
      }).catch((response) => {
        reject(response);
      });
  }),

  deleteSubject: (subjectId) => new Promise((resolve, reject) => {
    Subject.update({
      deleted: true,
    }, {
      where: {
        subjectId,
      }
    }).then((response) => {
        resolve(response);
      }).catch((response) => {
        reject(response);
      });
  }),
};
