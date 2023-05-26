const projectController = require('../../../src/controller/ProjectController');
const projectRepository = require('../../../src/repository/projectRepository');
const semesterRepository = require('../../../src/repository/semesterRepository');
const subjectRepository = require('../../../src/repository/subjectRepository');
const keywordRepository = require('../../../src/repository/keywordRepository');

jest.mock('../../../src/repository/projectRepository');
jest.mock('../../../src/repository/semesterRepository');
jest.mock('../../../src/repository/subjectRepository');
jest.mock('../../../src/repository/keywordRepository');

describe('ProjectController', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('addProject', () => {
    it('should add a project', async () => {
      const project = {
        name: 'Test Project',
        userId: 1,
        expectedresult: 'Test Result',
        feedback: 'Test Feedback',
        problem: 'Test Problem',
        keywords: [{ keywordid: 1, main: true }, { keywordid: 2, main: false }],
        semesterId: 1,
      };
      const subjectid = 1;
      const projectData = {
        projectId: 1,
        userId: project.userId,
        subjectId: subjectid,
        semesterId: project.semesterId,
        name: project.name,
        expectedResult: project.expectedresult,
        feedback: project.feedback,
        problem: project.problem,
        status: 'Open',
        deleted: false,
        createdAt: new Date(),
      };
      const expectedResponse = {
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
      };
      jest.spyOn(projectRepository, 'getSubjectByKeyword').mockResolvedValueOnce(subjectid);
      jest.spyOn(projectRepository, 'addProject').mockResolvedValueOnce(projectData);
      jest.spyOn(projectRepository, 'addProjectKeywords').mockResolvedValueOnce();

      const response = await projectController.addProject(project);

      expect(response).toEqual(expectedResponse);
      expect(projectRepository.getSubjectByKeyword).toHaveBeenCalledWith(project.keywords[0].keywordid);
      expect(projectRepository.addProject).toHaveBeenCalledWith({ ...project, subjectid });
      expect(projectRepository.addProjectKeywords).toHaveBeenCalledWith(projectData.projectId, project.keywords);
    });

    it('should reject with error when addProject throws an error', async () => {
      const project = {
        name: 'Test Project',
        userId: 1,
        expectedresult: 'Test Result',
        feedback: 'Test Feedback',
        problem: 'Test Problem',
        keywords: [{ keywordid: 1, main: true }, { keywordid: 2, main: false }],
        semesterId: 1,
      };
      const error = new Error('Unable to add project');
      jest.spyOn(projectRepository, 'getSubjectByKeyword').mockResolvedValueOnce(1);
      jest.spyOn(projectRepository, 'addProject').mockRejectedValueOnce(error);

      await expect(projectController.addProject(project)).rejects.toEqual(error);
      expect(projectRepository.getSubjectByKeyword).toHaveBeenCalledWith(project.keywords[0].keywordid);
      expect(projectRepository.addProject).toHaveBeenCalledWith({ ...project, subjectid: 1 });
    });
  });

  describe('getProjectData', () => {
    it('should resolve with project data and user, subject, semester, and keywords', async () => {
      const projectid = 1;
      const project = { projectid, userId: 2, subjectId: 3, semesterId: 4 };
      const user = { userid: project.userId };
      const subject = { subjectid: project.subjectId };
      const semester = { semesterid: project.semesterId };
      const keywords = [{ keywordid: 5 }];

      projectRepository.getProjectData.mockResolvedValue(project);
      projectRepository.getUserData.mockResolvedValue(user);
      keywordRepository.getProjectKeywords.mockResolvedValue(keywords);
      subjectRepository.getSubject.mockResolvedValue(subject);
      semesterRepository.getSemester.mockResolvedValue(semester);

      const result = await projectController.getProjectData(projectid);

      expect(result.projectid).toEqual(projectid);
      expect(result.User).toEqual(user);
      expect(result.Subject).toEqual(subject);
      expect(result.Semester).toEqual(semester);
      expect(result.Keywords).toEqual(keywords);
    });

    it('should reject with an error if any of the repository calls fail', async () => {
      const projectid = 1;
      const error = new Error('Something went wrong.');

      projectRepository.getProjectData.mockRejectedValue(error);

      await expect(projectController.getProjectData(projectid)).rejects.toThrow(error);
    });
  });

  describe('updateProject', () => {
    it('should resolve with updated project data', async () => {
      const project = {
        projectid: 1,
        userId: 2,
        subjectId: 3,
        semesterId: 4,
        keywords: [{ keywordid: 5, main: true }],
      };
      const subjectid = 6;
      const updatedProject = { ...project, subjectid };

      projectRepository.getSubjectByKeyword.mockResolvedValue(subjectid);
      projectRepository.removeProjectKeywords.mockResolvedValue();
      projectRepository.addProjectKeywords.mockResolvedValue();
      projectRepository.updateProject.mockResolvedValue(updatedProject);

      const result = await projectController.updateProject(project);

      expect(result).toEqual(updatedProject);
    });

    it('should reject with an error if any of the repository calls fail', async () => {
      const project = {
        projectid: 1,
        userId: 2,
        subjectId: 3,
        semesterId: 4,
        keywords: [{ keywordid: 5, main: true }],
      };
      const error = new Error('Something went wrong.');

      projectRepository.getSubjectByKeyword.mockRejectedValue(error);

      await expect(projectController.updateProject(project)).rejects.toThrow(error);
    });
  });

  describe('evaluateProject', () => {
    it('should call projectRepository.evaluateProject with the payload and return the result', async () => {
      const payload = { projectId: 1, evaluation: 'good' };
      const expectedResult = { success: true };
      projectRepository.evaluateProject.mockResolvedValue(expectedResult);

      const result = await projectController.evaluateProject(payload);

      expect(projectRepository.evaluateProject).toHaveBeenCalledWith(payload);
      expect(result).toEqual(expectedResult);
    });

    it('should throw an error if projectRepository.evaluateProject throws an error', async () => {
      const payload = { projectId: 1, evaluation: 'good' };
      const expectedError = new Error('Evaluation failed');
      projectRepository.evaluateProject.mockRejectedValue(expectedError);

      await expect(projectController.evaluateProject(payload)).rejects.toThrow(expectedError);
    });
  });

  describe('reallocateProject', () => {
    it('should call projectRepository.reallocateProject with the payload and return the result', async () => {
      const payload = { projectId: 1, newOwnerId: 2 };
      const expectedResult = { success: true };
      projectRepository.reallocateProject.mockResolvedValue(expectedResult);

      const result = await projectController.reallocateProject(payload);

      expect(projectRepository.reallocateProject).toHaveBeenCalledWith(payload);
      expect(result).toEqual(expectedResult);
    });

    it('should throw an error if projectRepository.reallocateProject throws an error', async () => {
      const payload = { projectId: 1, newOwnerId: 2 };
      const expectedError = new Error('Reallocation failed');
      projectRepository.reallocateProject.mockRejectedValue(expectedError);

      await expect(projectController.reallocateProject(payload)).rejects.toThrow(expectedError);
    });
  });

  describe('getUserProposals', () => {
    it('should call projectRepository.getUserProposals with the user and return the result', async () => {
      const user = { id: 1 };
      const expectedResult = [{ id: 1, title: 'Project 1' }];
      projectRepository.getUserProposals.mockResolvedValue(expectedResult);

      const result = await projectController.getUserProposals(user);

      expect(projectRepository.getUserProposals).toHaveBeenCalledWith(user);
      expect(result).toEqual(expectedResult);
    });

    it('should throw an error if projectRepository.getUserProposals throws an error', async () => {
      const user = { id: 1 };
      const expectedError = new Error('Failed to get user proposals');
      projectRepository.getUserProposals.mockRejectedValue(expectedError);

      await expect(projectController.getUserProposals(user)).rejects.toThrow(expectedError);
    });
  });

  describe('deleteProject', () => {
    it('should resolve with a success message when the project is successfully deleted', async () => {
      const projectId = 'some-project-id';
      const expectedResult = { message: 'Project successfully deleted' };

      projectRepository.deleteProject.mockResolvedValue(expectedResult);

      const result = await projectController.deleteProject(projectId);

      expect(result).toEqual(expectedResult);
      expect(projectRepository.deleteProject).toHaveBeenCalledWith(projectId);
    });

    it('should reject with an error when the project deletion fails', async () => {
      const projectId = 'some-project-id';
      const expectedError = new Error('Failed to delete project');

      projectRepository.deleteProject.mockRejectedValue(expectedError);

      await expect(projectController.deleteProject(projectId)).rejects.toThrow(expectedError);
      expect(projectRepository.deleteProject).toHaveBeenCalledWith(projectId);
    });
  });

  describe('getKeywordsAvailbleToProject', () => {
    it('should resolve with an array of available keywords', async () => {
      const expectedKeywords = [        { keywordid: 'kw1', keyword: 'Keyword 1' },        { keywordid: 'kw2', keyword: 'Keyword 2' },      ];

      keywordRepository.getKeywordsAvailbleToProject.mockResolvedValue(expectedKeywords);

      const result = await projectController.getKeywordsAvailbleToProject();

      expect(result).toEqual(expectedKeywords);
      expect(keywordRepository.getKeywordsAvailbleToProject).toHaveBeenCalled();
    });

    it('should reject with an error when the keywords retrieval fails', async () => {
      const expectedError = new Error('Failed to retrieve keywords');

      keywordRepository.getKeywordsAvailbleToProject.mockRejectedValue(expectedError);

      await expect(projectController.getKeywordsAvailbleToProject()).rejects.toThrow(expectedError);
      expect(keywordRepository.getKeywordsAvailbleToProject).toHaveBeenCalled();
    });
  });
});