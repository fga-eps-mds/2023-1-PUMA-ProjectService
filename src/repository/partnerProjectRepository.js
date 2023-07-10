const PartnerProject = require('../db/model/PartnerProject');

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
