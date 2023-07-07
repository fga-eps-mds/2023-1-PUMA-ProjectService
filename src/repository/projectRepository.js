const db = require('../../dbconfig/dbConfig');
const sequelize = require('../db/AppDb');
const Project = require('../db/model/Project');
const User = require('../db/model/User');
const Summarize = require('../db/model/Summarize');
const Abstracts = require('../db/model/Abstracts');

module.exports = {
  getUserProposals: async (user) => {
    return new Promise((resolve, reject) => {
      let results = new Promise(() => { });
      if (user.operation === 'projetos') {
        results = sequelize.query(`SELECT p."projectId", p.name, p."expectedResult", p.status, p."createdAt", s.name AS "Subject", u."fullName" FROM "Project" p LEFT JOIN "Subject" s on p."subjectId" = s."subjectId" LEFT JOIN "User" u on p."userId" = u."userId" WHERE not(p.deleted) ORDER BY p."projectId" DESC`);
      } else if (user.operation === 'projetos-disciplina') {
        results = sequelize.query(`SELECT p."projectId", p.name, p."expectedResult", p.status, p."createdAt", s.name AS "Subject", u."fullName" FROM "Project" p LEFT JOIN "Subject" s ON p."subjectId" = s."subjectId" LEFT JOIN "User" u ON p."userId" = u."userId" WHERE not(p.deleted) and p."subjectId" IN (SELECT DISTINCT l."subjectId" FROM "User_Properties" up INNER JOIN "Lectures" l ON up."userId" = l."userId" WHERE up."userId" = ${user.userId}) ORDER BY p."projectId" DESC`);
      } else {
        results = sequelize.query(`SELECT p."projectId", p.name, p."expectedResult", p.status, p."createdAt", s.name AS "Subject", u."fullName" FROM "Project" p LEFT JOIN "Subject" s on p."subjectId" = s."subjectId" LEFT JOIN "User" u on p."userId" = u."userId" WHERE not(p.deleted) and p."userId" = ${user.userId} ORDER BY p."projectId" DESC`);
      }
      results.then((response) => {
        resolve(response[0]);
      }).catch((response) => {
        reject(response);
      });
    });
  },

  getProjectData: (projectId) => {
    return new Promise((resolve, reject) => {
      Project.findOne({
        where: {
          projectId,
        }
      }).then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  getUserData: (userId) => {
    return new Promise((resolve, reject) => {
      User.findOne({
        where: {
          userId,
        }
      }).then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  // Used in allocation
  getSubjectByKeyword: (keywordId) => {
    return new Promise((resolve, reject) => {
      Summarize.findAll({
        where: {
          keywordId,
        }
      }).then((response) => {
        if (response) {
          resolve(response.subjectId);
        } else {
          reject({ status: 'NOK', message: 'Nenhuma disciplina contém a palavra-chave' });
        }
      }).catch((error) => {
        reject(error);
      });
    });
  },

  evaluateProject: ({ projectid, status, feedback }) => {
    return new Promise((resolve, reject) => {
      Project.update({
        status,
        feedback,
      }, {
        where: {
          projectId: projectid,
        },
        returning: true,
      }).then((response) => {
        resolve(response[1][0]);
      }).catch((error) => {
        reject(error);
      });
    });
  },

  reallocateProject: ({ projectid, status, feedback, subjectid }) => {
    return new Promise((resolve, reject) => {
      Project.update({
        status,
        feedback,
        subjectId: subjectid,
      }, {
        where: {
          projectId: projectid,
        },
        returning: true,
      }).then((response) => {
        resolve(response[1][0]);
      }).catch((error) => {
        reject(error);
      });
    });
  },

  addProject: (project) => {
    return new Promise((resolve, reject) => {
      Project.create({
        userId: project.userId,
        subjectId: project.subjectId,
        semesterId: project.semesterId,
        name: project.name,
        expectedResult: project.expectedResult,
        feedback: project.feedback,
        problem: project.problem,
        status: project.status,
        image: project.projectImage,
        pdf: project.projectPdf,
        isBestProject: project.isBestProject,
      }).then((response) => {
        resolve(response);
      }).catch((error) => {
        reject(error);
      });
    });
  },

  updateProject: (project) => {
    return new Promise(async (resolve, reject) => {
      const projectId = project.projectid;
      const subjectId = project.subjectid;

      const name = project.name;
      const expectedResult = project.expectedResult;
      const feedback = project.feedback;
      const problem = project.problem; 
      const status = project.status;
      const image = project.projectImage; 
      const pdf = project.projectPdf; 
      const isBestProject = project.isBestProject;
      Project.update({
        subjectId,
        name,
        expectedResult,
        feedback,
        problem,
        status,
        image,
        pdf,
        isBestProject,
      }, {
        where: {
          projectId,
        },
        returning: true,
      }).then((response) => {
          resolve(response[1][0]);
        }).catch((error) => {
          reject(error);
        });
    });
  },

  getProjects: () => new Promise((resolve, reject) => {
    Project.findAll({
      order: [['projectId', 'DESC']]
    }).then((response) => {
      resolve(response);
    }).catch((e) => reject(e));
  }),

  deleteProject: (projectId) => {
    return new Promise((resolve, reject) => {
      Project.update({
        deleted: true,
        isBestProject: false,
      }, {
        where: {
          projectId,
        }
      }).then(() => {
        resolve({ status: 'OK' });
      }).catch((error) => {
        reject(error);
      });
    });
  },

  addProjectKeywords: (projectId, keywords) => {
    return new Promise((resolve, reject) => {
      for (let i = 0; i < keywords.length; i++) {
        Abstracts.create({
          projectId,
          keywordId: keywords[i].keywordid,
          main: keywords[i].main
        }).then(() => {
          if (i === keywords.length - 1) {
            resolve();
          }
        }).catch((error) => {
          reject(error);
        });
      }
    });
  },

  removeProjectKeywords: (projectId) => {
    return new Promise((resolve, reject) => {
      Abstracts.destroy({
        where: {
          projectId,
        }
      }).then(() => {
        resolve();
      }).catch((error) => {
        reject(error);
      });
    });
  }
}
