const db = require('../../dbconfig/dbConfig');
const sequelize = require('../db/AppDb');
const Project = require('../db/model/Project');
const PartnerProject = require('../db/model/PartnerProject');

const Common_User = require('../db/model/Common_User');
const Summarize = require('../db/model/Summarize');
const Abstracts = require('../db/model/Abstracts');

module.exports = {
  getProjects: () => new Promise((resolve, reject) => {
    PartnerProject.findAll({}).then((response) => {
      resolve(response);
    }).catch((e) => reject(e));
  }),

  addProject: (project) => {
    return new Promise((resolve, reject) => {
      PartnerProject.create({
        title: project.title,
        expectedResult: project.expectedResult,
        problem: project.problem,
        objectives: project.objectives,
        projectImages: project.projectImages,
        projectPdf: project.projectPdf,
      }).then((response) => {
        resolve(response);
      }).catch((error) => {
        reject(error);
      });
    });
  },

  // updateProject: (project) => {
  //   return new Promise(async (resolve, reject) => {
  //     const projectId = project.projectid;
  //     const subjectId = project.subjectid;

  //     const name = project.name;
  //     const expectedResult = project.expectedResult;
  //     const feedback = project.feedback;
  //     const problem = project.problem; 
  //     const status = project.status;
  //     const image = project.projectImage; 
  //     const pdf = project.projectPdf; 
  //     Project.update({
  //       subjectId,
  //       name,
  //       expectedResult,
  //       feedback,
  //       problem,
  //       status,
  //       image,
  //       pdf,
  //     }, {
  //       where: {
  //         projectId,
  //       },
  //       returning: true,
  //     }).then((response) => {
  //         resolve(response[1][0]);
  //       }).catch((error) => {
  //         reject(error);
  //       });
  //   });
  // },



  // deleteProject: (projectId) => {
  //   return new Promise((resolve, reject) => {
  //     Project.update({
  //       deleted: true,
  //     }, {
  //       where: {
  //         projectId,
  //       }
  //     }).then(() => {
  //       resolve({ status: 'OK' });
  //     }).catch((error) => {
  //       reject(error);
  //     });
  //   });
  // },

}
