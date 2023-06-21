const sequelize = require('../../../src/db/AppDb');
const Project = require('../../../src/db/model/Project');
const User = require('../../../src/db/model/User');
const Summarize = require('../../../src/db/model/Summarize');
const Abstracts = require('../../../src/db/model/Abstracts');

const projectRepository = require('../../../src/repository/projectRepository');

jest.mock('../../../src/db/AppDb', () => ({
  query: jest.fn(),
}));

jest.mock('../../../src/db/model/Project', () => {
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

jest.mock('../../../src/db/model/Summarize', () => {
  return {
    create: jest.fn(),
    findAll: jest.fn(),
  };
});

jest.mock('../../../src/db/model/Abstracts', () => {
  return {
    create: jest.fn(),
    findAll: jest.fn(),
  };
});

describe('Repository', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getUserProposals', () => {
    it('should resolve with response from sequelize.query when user.operation is "projetos"', async () => {
      const user = { operation: 'projetos', userId: 1 };
      const expectedResult = { id: 1, name: 'Project 1' };

      sequelize.query.mockResolvedValue([expectedResult]);

      const result = await projectRepository.getUserProposals(user);

      expect(result).toBe(expectedResult);
      expect(sequelize.query).toHaveBeenCalledWith(`SELECT p."projectId", p.name, p."expectedResult", p.status, p."createdAt", s.name AS "Subject", u."fullName" FROM "Project" p LEFT JOIN "Subject" s on p."subjectId" = s."subjectId" LEFT JOIN "User" u on p."userId" = u."userId" WHERE not(p.deleted) ORDER BY p."projectId" DESC`);
    });

    it('should resolve with response from sequelize.query when user.operation is "projetos-disciplina"', async () => {
      const user = { operation: 'projetos-disciplina', userId: 1 };
      const expectedResult = { id: 1, name: 'Project 1' };

      sequelize.query.mockResolvedValue([expectedResult]);

      const result = await projectRepository.getUserProposals(user);

      expect(result).toBe(expectedResult);
      expect(sequelize.query).toHaveBeenCalledWith(`SELECT p."projectId", p.name, p."expectedResult", p.status, p."createdAt", s.name AS "Subject", u."fullName" FROM "Project" p LEFT JOIN "Subject" s ON p."subjectId" = s."subjectId" LEFT JOIN "User" u ON p."userId" = u."userId" WHERE not(p.deleted) and p."subjectId" IN (SELECT DISTINCT l."subjectId" FROM "User_Properties" up INNER JOIN "Lectures" l ON up."userId" = l."userId" WHERE up."userId" = 1) ORDER BY p."projectId" DESC`);
    });

    it('should resolve with response from sequelize.query when user.operation is not "projetos" or "projetos-disciplina"', async () => {
      const user = { operation: 'other', userId: 1 };
      const expectedResult = { id: 1, name: 'Project 1' };

      sequelize.query.mockResolvedValue([expectedResult]);

      const result = await projectRepository.getUserProposals(user);

      expect(result).toBe(expectedResult);
      expect(sequelize.query).toHaveBeenCalledWith(`SELECT p."projectId", p.name, p."expectedResult", p.status, p."createdAt", s.name AS "Subject", u."fullName" FROM "Project" p LEFT JOIN "Subject" s on p."subjectId" = s."subjectId" LEFT JOIN "User" u on p."userId" = u."userId" WHERE not(p.deleted) and p."userId" = 1 ORDER BY p."projectId" DESC`);
    });

    it('should reject with response when sequelize.query throws an error', async () => {
      const user = { operation: 'projetos', userId: 1 };
      const expectedError = new Error('Database error');

      sequelize.query.mockRejectedValue(expectedError);

      await expect(projectRepository.getUserProposals(user)).rejects.toThrow(expectedError);
    });
  });

  describe('getProjectData', () => {
    it('should resolve with response from Project.findOne', async () => {
      const projectId = 1;
      const expectedResult = { id: projectId, name: 'Project 1' };

      Project.findOne.mockResolvedValue(expectedResult);

      const result = await projectRepository.getProjectData(projectId);

      expect(result).toBe(expectedResult);
      expect(Project.findOne).toHaveBeenCalledWith({ where: { projectId } });
    });

    it('should reject with error when Project.findOne throws an error', async () => {
      const projectId = 1;
      const expectedError = new Error('Database error');

      Project.findOne.mockRejectedValue(expectedError);

      await expect(projectRepository.getProjectData(projectId)).rejects.toThrow(expectedError);
    });
  });

  describe('getUserData', () => {
    it('should resolve with response from User.findOne', async () => {
      const userId = 123;
      const expectedResult = { id: userId, name: 'User 1' };

      User.findOne.mockResolvedValue(expectedResult);

      const result = await projectRepository.getUserData(userId);

      expect(result).toBe(expectedResult);
      expect(User.findOne).toHaveBeenCalledWith({ where: { userId } });
    });

    it('should reject with error when User.findOne throws an error', async () => {
      const userId = 123;
      const expectedError = new Error('Database error');

      User.findOne.mockRejectedValue(expectedError);

      await expect(projectRepository.getUserData(userId)).rejects.toThrow(expectedError);
    });
  });

  describe('getSubjectByKeyword', () => {
    it('should resolve with subjectId when Summarize.findAll returns a response', async () => {
      const keywordId = 1;
      const expectedResult = 123;

      Summarize.findAll.mockResolvedValue({ subjectId: expectedResult });

      const result = await projectRepository.getSubjectByKeyword(keywordId);

      expect(result).toBe(expectedResult);
      expect(Summarize.findAll).toHaveBeenCalledWith({ where: { keywordId } });
    });

    it('should reject with an error when Summarize.findAll returns an empty response', async () => {
      const keywordId = 1;
      const expectedError = { status: 'NOK', message: 'Nenhuma disciplina contém a palavra-chave' };

      Summarize.findAll.mockRejectedValue(expectedError);

      await expect(projectRepository.getSubjectByKeyword(keywordId)).rejects.toStrictEqual(expectedError);
      expect(Summarize.findAll).toHaveBeenCalledWith({ where: { keywordId } });
    });

    it('should reject with an error when Summarize.findAll throws an error', async () => {
      const keywordId = 1;
      const expectedError = new Error('Database error');

      Summarize.findAll.mockRejectedValue(expectedError);

      await expect(projectRepository.getSubjectByKeyword(keywordId)).rejects.toThrow(expectedError);
      expect(Summarize.findAll).toHaveBeenCalledWith({ where: { keywordId } });
    });
  });

  describe('evaluateProject', () => {
    it('should resolve with updated project when Project.update is successful', async () => {
      const projectid = 1;
      const status = 'completed';
      const feedback = 'Great job!';
      const expectedResult = { id: projectid, status, feedback };

      Project.update.mockResolvedValue([1, [expectedResult]]);

      const result = await projectRepository.evaluateProject({ projectid, status, feedback });

      expect(result).toBe(expectedResult);
      expect(Project.update).toHaveBeenCalledWith(
        { status, feedback },
        { where: { projectId: projectid }, returning: true }
      );
    });

    it('should reject with an error when Project.update throws an error', async () => {
      const projectid = 1;
      const status = 'completed';
      const feedback = 'Great job!';
      const expectedError = new Error('Database error');

      Project.update.mockRejectedValue(expectedError);

      await expect(projectRepository.evaluateProject({ projectid, status, feedback })).rejects.toThrow(expectedError);
      expect(Project.update).toHaveBeenCalledWith(
        { status, feedback },
        { where: { projectId: projectid }, returning: true }
      );
    });
  });

  describe('reallocateProject', () => {
    it('should resolve with updated project when Project.update is successful', async () => {
      const projectid = 1;
      const status = 'in progress';
      const feedback = 'Work in progress';
      const subjectid = 123;
      const expectedResult = { id: projectid, status, feedback, subjectId: subjectid };

      Project.update.mockResolvedValue([1, [expectedResult]]);

      const result = await projectRepository.reallocateProject({ projectid, status, feedback, subjectid });

      expect(result).toBe(expectedResult);
      expect(Project.update).toHaveBeenCalledWith(
        { status, feedback, subjectId: subjectid },
        { where: { projectId: projectid }, returning: true }
      );
    });

    it('should reject with an error when Project.update throws an error', async () => {
      const projectid = 1;
      const status = 'in progress';
      const feedback = 'Work in progress';
      const subjectid = 123;
      const expectedError = new Error('Database error');

      Project.update.mockRejectedValue(expectedError);

      await expect(projectRepository.reallocateProject({ projectid, status, feedback, subjectid })).rejects.toThrow(expectedError);
      expect(Project.update).toHaveBeenCalledWith(
        { status, feedback, subjectId: subjectid },
        { where: { projectId: projectid }, returning: true }
      );
    });
  });

  describe('addProject', () => {
    it('should resolve with created project when Project.create is successful', async () => {
      const project = {
        userId: 123,
        subjectId: 456,
        semesterId: 789,
        name: 'New Project',
        expectedResult: 'Expected Result',
        feedback: 'Feedback',
        problem: 'Problem',
        status: 'in progress'
      };
      const expectedResult = { id: 1, ...project };

      Project.create.mockResolvedValue(expectedResult);

      const result = await projectRepository.addProject(project);

      expect(result).toBe(expectedResult);
      expect(Project.create).toHaveBeenCalledWith(project);
    });

    it('should reject with an error when Project.create throws an error', async () => {
      const project = {
        userId: 123,
        subjectId: 456,
        semesterId: 789,
        name: 'New Project',
        expectedResult: 'Expected Result',
        feedback: 'Feedback',
        problem: 'Problem',
        status: 'in progress'
      };
      const expectedError = new Error('Database error');

      Project.create.mockRejectedValue(expectedError);

      await expect(projectRepository.addProject(project)).rejects.toThrow(expectedError);
      expect(Project.create).toHaveBeenCalledWith(project);
    });
  });

  describe('updateProject', () => {
    it('should resolve with updated project when Project.update is successful', async () => {
      const projectid = 1;
      const project = {
        name: 'Updated Project',
        expectedResult: 'Updated Expected Result',
        feedback: 'Updated Feedback',
        problem: 'Updated Problem',
        status: 'completed'
      };
      const expectedResult = { id: projectid, ...project };

      Project.update.mockResolvedValue([1, [expectedResult]]);

      const result = await projectRepository.updateProject(projectid, project);

      expect(result).toBe(expectedResult);
    });

    it('should reject with an error when Project.update throws an error', async () => {
      const project = {
        projectid: 1,
        name: 'Updated Project',
        expectedResult: 'Updated Expected Result',
        feedback: 'Updated Feedback',
        problem: 'Updated Problem',
        status: 'completed',
        subjectid: 12,
        expectedresult: 'teste',
      };
      const expectedError = new Error('Database error');

      Project.update.mockRejectedValue(expectedError);

      await expect(projectRepository.updateProject(project)).rejects.toThrow(expectedError);
    });
  });

  describe('deleteProject', () => {
    it('should reject with an error when Project.destroy throws an error', async () => {
      const projectid = 1;
      const expectedError = new Error('Database error');

      Project.destroy.mockRejectedValue(expectedError);

      await expect(projectRepository.deleteProject(projectid)).rejects.toThrow(expectedError);
    });
  });

  describe('getProjects', () => {
    test('should get all projects in descending order', async () => {
      const findAllSpy = jest.spyOn(Project, 'findAll').mockResolvedValue([{ projectId: 1 }, { projectId: 2 }]);
  
      const response = await projectRepository.getProjects();
      expect(response).toBeDefined();
      expect(findAllSpy).toHaveBeenCalledWith({ order: [['projectId', 'DESC']] });
      expect(response.length).toEqual(2);
      expect(response[0].projectId).toEqual(1);
      expect(response[1].projectId).toEqual(2);
    });
  
    test('should reject when getting all projects fails', async () => {
      const findAllSpy = jest.spyOn(Project, 'findAll').mockRejectedValue(new Error('Failed to get all projects'));
  
      await expect(projectRepository.getProjects()).rejects.toThrowError('Failed to get all projects');
      expect(findAllSpy).toHaveBeenCalledWith({ order: [['projectId', 'DESC']] });
    });
  });
  
});