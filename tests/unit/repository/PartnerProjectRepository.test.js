const sequelize = require('../../../src/db/AppDb');
const PartnerProject = require('../../../src/db/model/PartnerProject');
const User = require('../../../src/db/model/User');

const partnerProjectRepository = require('../../../src/repository/partnerProjectRepository');

jest.mock('../../../src/db/AppDb', () => ({
  query: jest.fn(),
}));

jest.mock('../../../src/db/model/PartnerProject', () => {
  return {
    create: jest.fn(),
    findAll: jest.fn(),
    destroy: jest.fn(),
    update: jest.fn(),
    findOne: jest.fn(),
  };
});

jest.mock('../../../src/db/model/User', () => {
  return {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
  };
});

describe('PartnerProjectRepository', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getProjects', () => {
    it('should get all projects', async () => {
      const expectedResponse = [
        { projectId: 1, name: 'Project 1' },
        { projectId: 2, name: 'Project 2' },
      ];
      jest.spyOn(PartnerProject, 'findAll').mockResolvedValueOnce(expectedResponse);

      const response = await partnerProjectRepository.getProjects();

      expect(response).toEqual(expectedResponse);
      expect(PartnerProject.findAll).toHaveBeenCalled();
    });

    it('should reject with error when unable to get projects', async () => {
      const error = new Error('Unable to get projects');
      jest.spyOn(PartnerProject, 'findAll').mockRejectedValueOnce(error);

      await expect(partnerProjectRepository.getProjects()).rejects.toEqual(error);
      expect(PartnerProject.findAll).toHaveBeenCalled();
    });
  });

  describe('getProject', () => {
    it('should get a project by projectId', async () => {
      const projectId = 1;
      const expectedResponse = [{ projectId, name: 'Project 1' }];
      jest.spyOn(PartnerProject, 'findAll').mockResolvedValueOnce(expectedResponse);

      const response = await partnerProjectRepository.getProject(projectId);

      expect(response).toEqual(expectedResponse);
      expect(PartnerProject.findAll).toHaveBeenCalledWith({
        where: {
          projectId,
        },
      });
    });

    it('should reject with error when unable to get a project', async () => {
      const projectId = 1;
      const error = new Error('Unable to get project');
      jest.spyOn(PartnerProject, 'findAll').mockRejectedValueOnce(error);

      await expect(partnerProjectRepository.getProject(projectId)).rejects.toEqual(error);
      expect(PartnerProject.findAll).toHaveBeenCalledWith({
        where: {
          projectId,
        },
      });
    });
  });



  describe('deleteProject', () => {
    it('should delete a project by projectId', async () => {
      const projectId = 1;
      const expectedResponse = 1; // Number of deleted rows
      jest.spyOn(PartnerProject, 'destroy').mockResolvedValueOnce(expectedResponse);

      const response = await partnerProjectRepository.deleteProject(projectId);

      expect(response).toEqual(expectedResponse);
      expect(PartnerProject.destroy).toHaveBeenCalledWith({
        where: {
          projectId,
        },
      });
    });

    it('should reject with error when unable to delete a project', async () => {
      const projectId = 1;
      const error = new Error('Unable to delete project');
      jest.spyOn(PartnerProject, 'destroy').mockRejectedValueOnce(error);

      await expect(partnerProjectRepository.deleteProject(projectId)).rejects.toEqual(error);
      expect(PartnerProject.destroy).toHaveBeenCalledWith({
        where: {
          projectId,
        },
      });
    });
  });

  describe('addProject', () => {
    it('should add a project', async () => {
      const project = {
        title: 'Test Project',
        expectedResult: 'Test Result',
        problem: 'Test Problem',
        objectives: 'Test Objectives',
        projectImages: ['image1.jpg', 'image2.jpg'],
        projectPdf: 'project.pdf',
      };
      const expectedResponse = {
        projectId: 1,
        title: project.title,
        expectedResult: project.expectedResult,
        problem: project.problem,
        objectives: project.objectives,
        projectImages: project.projectImages,
        projectPdf: project.projectPdf,
      };
      jest.spyOn(PartnerProject, 'create').mockResolvedValueOnce(expectedResponse);

      const response = await partnerProjectRepository.addProject(project);

      expect(response).toEqual(expectedResponse);
      expect(PartnerProject.create).toHaveBeenCalledWith({
        title: project.title,
        expectedResult: project.expectedResult,
        problem: project.problem,
        objectives: project.objectives,
        projectImages: project.projectImages,
        projectPdf: project.projectPdf,
      });
    });

    it('should reject with error when unable to add a project', async () => {
      const project = {
        title: 'Test Project',
        expectedResult: 'Test Result',
        problem: 'Test Problem',
        objectives: 'Test Objectives',
        projectImages: ['image1.jpg', 'image2.jpg'],
        projectPdf: 'project.pdf',
      };
      const error = new Error('Unable to add project');
      jest.spyOn(PartnerProject, 'create').mockRejectedValueOnce(error);

      await expect(partnerProjectRepository.addProject(project)).rejects.toEqual(error);
      expect(PartnerProject.create).toHaveBeenCalledWith({
        title: project.title,
        expectedResult: project.expectedResult,
        problem: project.problem,
        objectives: project.objectives,
        projectImages: project.projectImages,
        projectPdf: project.projectPdf,
      });
    });
  });

  describe('updateProject', () => {
    it('should update a project by projectId', async () => {
      const projectId = 1;
      const updatedData = {
        title: 'Updated Project',
        expectedResult: 'Updated Result',
        problem: 'Updated Problem',
        objectives: 'Updated Objectives',
        projectImages: ['image1.jpg', 'image2.jpg'],
        projectPdf: 'project.pdf',
      };
      const expectedResponse = 1; // Number of updated rows
      jest.spyOn(PartnerProject, 'update').mockResolvedValueOnce(expectedResponse);

      const response = await partnerProjectRepository.updateProject(projectId, updatedData);

      expect(response).toEqual(expectedResponse);
      expect(PartnerProject.update).toHaveBeenCalledWith(
        {
          title: updatedData.title,
          expectedResult: updatedData.expectedResult,
          problem: updatedData.problem,
          objectives: updatedData.objectives,
          projectImages: updatedData.projectImages,
          projectPdf: updatedData.projectPdf,
        },
        {
          where: {
            projectId,
          },
        }
      );
    });

    it('should reject with error when unable to update a project', async () => {
      const projectId = 1;
      const updatedData = {
        title: 'Updated Project',
        expectedResult: 'Updated Result',
        problem: 'Updated Problem',
        objectives: 'Updated Objectives',
        projectImages: ['image1.jpg', 'image2.jpg'],
        projectPdf: 'project.pdf',
      };
      const error = new Error('Unable to update project');
      jest.spyOn(PartnerProject, 'update').mockRejectedValueOnce(error);

      await expect(partnerProjectRepository.updateProject(projectId, updatedData)).rejects.toEqual(error);
      expect(PartnerProject.update).toHaveBeenCalledWith(
        {
          title: updatedData.title,
          expectedResult: updatedData.expectedResult,
          problem: updatedData.problem,
          objectives: updatedData.objectives,
          projectImages: updatedData.projectImages,
          projectPdf: updatedData.projectPdf,
        },
        {
          where: {
            projectId,
          },
        }
      );
    });
  });

});

