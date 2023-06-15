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

  getProject: (projectId) => new Promise((resolve, reject) => {
    PartnerProject.findAll({
      where: {
        projectId: projectId,
      },
    }).then((response) => {
      resolve(response);
    }).catch((e) => reject(e));
  }),

  deleteProject: (projectId) => new Promise((resolve, reject) => {
    PartnerProject.destroy({
      where: {
        projectId: projectId,
      },
    }).then((response) => {
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

  updateProject: (id, project) => {
    return new Promise((resolve, reject) => {
      PartnerProject.update({
        title: project.title,
        expectedResult: project.expectedResult,
        problem: project.problem,
        objectives: project.objectives,
        projectImages: project.projectImages,
        projectPdf: project.projectPdf,
      },
        {
          where: {
            projectId: id
          }
        }).then((response) => {
          resolve(response);
        }).catch((error) => {
          reject(error);
        });
    });
  },
}
