const partnerProjectController = require('../../../src/controller/PartnerProjectController');
const partnerProjectRepository = require('../../../src/repository/partnerProjectRepository');

jest.mock('../../../src/repository/partnerProjectRepository');

describe('PartnerProjectController', () => {
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
      const expectedResponse = {
        projectId: 1,
        userId: project.userId,
        name: project.name,
        expectedResult: project.expectedresult,
        feedback: project.feedback,
        problem: project.problem,
        createdAt: new Date(),
      };
      jest.spyOn(partnerProjectRepository, 'addProject').mockResolvedValueOnce(expectedResponse);

      const response = await partnerProjectController.addProject(project);

      expect(response).toEqual(expectedResponse);
      expect(partnerProjectRepository.addProject).toHaveBeenCalledWith(project);
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
      jest.spyOn(partnerProjectRepository, 'addProject').mockRejectedValueOnce(error);

      await expect(partnerProjectController.addProject(project)).rejects.toEqual(error);
      expect(partnerProjectRepository.addProject).toHaveBeenCalledWith(project);
    });
  });

  describe('getProject', () => {
    it('should get a project', async () => {
      const projectId = 1;
      const expectedResponse = {
        projectId,
        name: 'Test Project',
        userId: 1,
        expectedResult: 'Test Result',
        feedback: 'Test Feedback',
        problem: 'Test Problem',
        createdAt: new Date(),
      };
      jest.spyOn(partnerProjectRepository, 'getProject').mockResolvedValueOnce(expectedResponse);

      const response = await partnerProjectController.getProject(projectId);

      expect(response).toEqual(expectedResponse);
      expect(partnerProjectRepository.getProject).toHaveBeenCalledWith(projectId);
    });

    it('should reject with error when getProject throws an error', async () => {
      const projectId = 1;
      const error = new Error('Unable to get project');
      jest.spyOn(partnerProjectRepository, 'getProject').mockRejectedValueOnce(error);

      await expect(partnerProjectController.getProject(projectId)).rejects.toEqual(error);
      expect(partnerProjectRepository.getProject).toHaveBeenCalledWith(projectId);
    });
  });

  describe('PartnerProjectController', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    describe('updateProject', () => {
      it('should update a project', async () => {
        const projectId = 1;
        const updatedData = {
          name: 'Updated Project',
          expectedResult: 'Updated Result',
          feedback: 'Updated Feedback',
          problem: 'Updated Problem',
        };
        const expectedResponse = {
          projectId,
          name: updatedData.name,
          userId: 1,
          expectedResult: updatedData.expectedResult,
          feedback: updatedData.feedback,
          problem: updatedData.problem,
          createdAt: new Date(),
        };
        jest.spyOn(partnerProjectRepository, 'updateProject').mockResolvedValueOnce(expectedResponse);

        const response = await partnerProjectController.updateProject(projectId, updatedData);

        expect(response).toEqual(expectedResponse);
        expect(partnerProjectRepository.updateProject).toHaveBeenCalledWith(projectId, updatedData);
      });

      it('should reject with error when updateProject throws an error', async () => {
        const projectId = 1;
        const updatedData = {
          name: 'Updated Project',
          expectedResult: 'Updated Result',
          feedback: 'Updated Feedback',
          problem: 'Updated Problem',
        };
        const error = new Error('Unable to update project');
        jest.spyOn(partnerProjectRepository, 'updateProject').mockRejectedValueOnce(error);

        await expect(partnerProjectController.updateProject(projectId, updatedData)).rejects.toEqual(error);
        expect(partnerProjectRepository.updateProject).toHaveBeenCalledWith(projectId, updatedData);
      });
    });

    describe('deleteProject', () => {
      it('should delete a project', async () => {
        const projectId = 1;
        const expectedResponse = { success: true };
        jest.spyOn(partnerProjectRepository, 'deleteProject').mockResolvedValueOnce(expectedResponse);

        const response = await partnerProjectController.deleteProject(projectId);

        expect(response).toEqual(expectedResponse);
        expect(partnerProjectRepository.deleteProject).toHaveBeenCalledWith(projectId);
      });

      it('should reject with error when deleteProject throws an error', async () => {
        const projectId = 1;
        const error = new Error('Unable to delete project');
        jest.spyOn(partnerProjectRepository, 'deleteProject').mockRejectedValueOnce(error);

        await expect(partnerProjectController.deleteProject(projectId)).rejects.toEqual(error);
        expect(partnerProjectRepository.deleteProject).toHaveBeenCalledWith(projectId);
      });
    });

    describe('getProjects', () => {
      it('should get projects', async () => {
        const expectedResponse = [
          {
            projectId: 1,
            name: 'Project 1',
            userId: 1,
            expectedResult: 'Result 1',
            feedback: 'Feedback 1',
            problem: 'Problem 1',
            createdAt: new Date(),
          },
          {
            projectId: 2,
            name: 'Project 2',
            userId: 2,
            expectedResult: 'Result 2',
            feedback: 'Feedback 2',
            problem: 'Problem 2',
            createdAt: new Date(),
          },
        ];
        jest.spyOn(partnerProjectRepository, 'getProjects').mockResolvedValueOnce(expectedResponse);

        const response = await partnerProjectController.getProjects();

        expect(response).toEqual(expectedResponse);
        expect(partnerProjectRepository.getProjects).toHaveBeenCalled();
      });

      it('should reject with error when getProjects throws an error', async () => {
        const error = new Error('Unable to get projects');
        jest.spyOn(partnerProjectRepository, 'getProjects').mockRejectedValueOnce(error);

        await expect(partnerProjectController.getProjects()).rejects.toEqual(error);
        expect(partnerProjectRepository.getProjects).toHaveBeenCalled();
      });
    });
  });
});
