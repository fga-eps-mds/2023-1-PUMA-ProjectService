const projectRepository = require('../repository/projectRepository');
const semesterRepository = require('../repository/semesterRepository');
const subjectRepository = require('../repository/subjectRepository');
const keywordRepository = require('../repository/keywordRepository');

module.exports = {
  addProject: (project) => {
    return new Promise(async (resolve, reject) => {
      try {
        const mainKeyword = project.keywords.find((k) => k.main)?.keywordid;
        const subjectid = await projectRepository.getSubjectByKeyword(mainKeyword);

        const projectData = await projectRepository.addProject({ ...project, subjectid });
        await projectRepository.addProjectKeywords(projectData.projectId, project.keywords);

        resolve({
          projectid: projectData.projectId,
          userid: projectData.userId,
          subjectid: projectData.subjectId,
          semesterid: projectData.semesterId,
          name: projectData.name,
          expectedresult: projectData.expectedResult,
          feedback: projectData.feedback,
          problem: projectData.problem,
          status: projectData.status,
          deleted: projectData.deleted,
          createdAt: projectData.createdAt,
          image: projectData.projectImage,
          pdf: projectData.projectPdf,
        });
      } catch (error) {
        reject(error);
      }
    })
  },

  getProjectData: (projectid) => {
    return new Promise(async (resolve, reject) => {
      try {
        let User = null;
        let Subject = null;
        let Semester = null;
        let Keywords = null;
        const project = await projectRepository.getProjectData(projectid);

        User = await projectRepository.getUserData(project.userId);
        Keywords = await keywordRepository.getProjectKeywords(projectid);

        if (project.subjectId) {
          Subject = await subjectRepository.getSubject({ subjectid: project.subjectId });
        }

        if (project.semesterId) {
          Semester = await semesterRepository.getSemester(project.semesterId);
        }

        resolve({ ...project, User, Subject, Semester, Keywords });
      } catch (error) {
        reject(error);
      }
    });
  },

  updateProject: (project) => {
    return new Promise(async (resolve, reject) => {
      try {
        const mainKeyword = project.keywords.find((k) => k.main)?.keywordid;
        const subjectid = await projectRepository.getSubjectByKeyword(mainKeyword);

        await projectRepository.removeProjectKeywords(project.projectid);
        await projectRepository.addProjectKeywords(project.projectid, project.keywords);

        const projectData = await projectRepository.updateProject({ ...project, subjectid });

        resolve({ ...projectData });
      } catch (error) {
        reject(error);
      }
    })
  },

  getProjects: () => new Promise(async (resolve, reject) => {
    try {
        const response = await projectRepository.getProjects();
        resolve(response);
    } catch (e) {
        reject(e);
    }
  }),

  evaluateProject: (payload) => {
    return new Promise((resolve, reject) => {
      projectRepository.evaluateProject(payload).then((response) => {
        resolve(response);
      }).catch((e) => reject(e));
    });
  },

  reallocateProject: (payload) => {
    return new Promise((resolve, reject) => {
      projectRepository.reallocateProject(payload).then((response) => {
        resolve(response);
      }).catch((e) => reject(e));
    });
  },

  getUserProposals: (user) => {
    return new Promise((resolve, reject) => {
      projectRepository.getUserProposals(user).then((response) => {
        resolve(response);
      }).catch((error) => { reject(error) });
    })
  },

  deleteProject: (projectId) => {
    return new Promise((resolve, reject) => {
      projectRepository.deleteProject(projectId).then((response) => {
        resolve(response);
      }).catch((error) => { reject(error) });
    });
  },

  getKeywordsAvailbleToProject: () => {
    return new Promise((resolve, reject) => {
      keywordRepository.getKeywordsAvailbleToProject().then((response) => {
        resolve(response);
      }).catch((error) => { reject(error) });
    })
  },
};
