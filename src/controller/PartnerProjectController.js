const partnerProjectRepository = require('../repository/partnerProjectRepository');
const semesterRepository = require('../repository/semesterRepository');
const subjectRepository = require('../repository/subjectRepository');
const keywordRepository = require('../repository/keywordRepository');
const { response } = require('express');

module.exports = {
  addProject: async (project) => {
    try {
      const response = await partnerProjectRepository.addProject(project);
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },

  getProject: (id) => {
    return new Promise((resolve, reject) => {
      partnerProjectRepository.getProject(id).then((response) => {
        resolve(response);
      }).catch((error) => {
        reject(error);
      });
    });
  },

  updateProject: (id, data) => {
    return new Promise((resolve, reject) => {
      partnerProjectRepository.updateProject(id, data).then((response) => {
        resolve(response);
      }).catch((error) => {
        reject(error);
      });
    });
  },

  deleteProject: (id) => {
    return new Promise((resolve, reject) => {
      partnerProjectRepository.deleteProject(id).then((response) => {
        resolve(response);
      }).catch((error) => {
        reject(error);
      });
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
};
