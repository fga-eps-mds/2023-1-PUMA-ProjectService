const partnerProjectRepository = require('../repository/partnerProjectRepository');
const semesterRepository = require('../repository/semesterRepository');
const subjectRepository = require('../repository/subjectRepository');
const keywordRepository = require('../repository/keywordRepository');
const { response } = require('express');

module.exports = {
  addProject: (project) => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await partnerProjectRepository.addProject(project);
        resolve(response);
      } catch (error) {
        console.log(error)
        reject(error);
      }
    });
  },

  getProjects: () => {
    return new Promise((resolve, reject) => {
      partnerProjectRepository.getProjects().then((response) => {
        resolve(response);
      }).catch((error) => {
        reject(error);
      });
    });
  },

  // deleteProject: (projectId) => {
  //   return new Promise((resolve, reject) => {
  //     projectRepository.deleteProject(projectId).then((response) => {
  //       resolve(response);
  //     }).catch((error) => { reject(error) });
  //   });
  // },
};
