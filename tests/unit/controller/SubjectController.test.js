const Subject = require('../../../src/db/model/Subject');

const subjectController = require('../../../src/controller/SubjectController');

const subjectRepository = require('../../../src/repository/subjectRepository');
const keywordRepository = require('../../../src/repository/keywordRepository');
const subareaRepository = require('../../../src/repository/subareaRepository');
const knowledgeAreaRepository = require('../../../src/repository/knowledgeArea');
const professorRepository = require('../../../src/repository/professorRepository');

jest.mock('../../../src/repository/subjectRepository');
jest.mock('../../../src/repository/keywordRepository');
jest.mock('../../../src/repository/subareaRepository');
jest.mock('../../../src/repository/knowledgeArea');
jest.mock('../../../src/repository/professorRepository');

// Mocked input data for testing
const subjectData = {
  subjectId: 1,
  name: 'Math',
  courseSyllabus: 'Calculus, Algebra, Geometry'
};

describe('subject controller', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getKeywords()', () => {
    it('should resolve with response when successful', async () => {
      const response = [{ keywordid: 1, keyword: 'test' }];
      keywordRepository.getKeywordAvailbleToSubject.mockResolvedValue(response);

      const result = await subjectController.getKeywords();

      expect(result).toEqual(response);
      expect(keywordRepository.getKeywordAvailbleToSubject).toHaveBeenCalledTimes(1);
    });

    it('should reject with error when failed', async () => {
      const error = new Error('failed');
      keywordRepository.getKeywordAvailbleToSubject.mockRejectedValue(error);

      await expect(subjectController.getKeywords()).rejects.toThrow(error);
      expect(keywordRepository.getKeywordAvailbleToSubject).toHaveBeenCalledTimes(1);
    });
  });

  describe('getKnowledgeAreas', () => {
    it('should return an array of knowledge areas with their respective subareas', async () => {
      const knowledgeAreas = [
        {
          knowledgeareaid: 1,
          name: 'Mathematics',
        },
        {
          knowledgeareaid: 2,
          name: 'Physics',
        },
      ];
      const subareas = [
        {
          subareaid: 1,
          name: 'Algebra',
          knowledgeareaid: 1,
        },
        {
          subareaid: 2,
          name: 'Calculus',
          knowledgeareaid: 1,
        },
        {
          subareaid: 3,
          name: 'Thermodynamics',
          knowledgeareaid: 2,
        },
      ];

      knowledgeAreaRepository.getKnowledgeAreas = jest.fn().mockResolvedValue(knowledgeAreas);
      subareaRepository.getSubareas = jest.fn().mockResolvedValue(subareas);

      const expectedResponse = [
        {
          knowledgeareaid: 1,
          name: 'Mathematics',
          subareas: [
            {
              subareaid: 1,
              name: 'Algebra',
              knowledgeareaid: 1,
            },
            {
              subareaid: 2,
              name: 'Calculus',
              knowledgeareaid: 1,
            },
          ],
        },
        {
          knowledgeareaid: 2,
          name: 'Physics',
          subareas: [
            {
              subareaid: 3,
              name: 'Thermodynamics',
              knowledgeareaid: 2,
            },
          ],
        },
      ];

      const response = await subjectController.getKnowledgeAreas();
      expect(response).toEqual(expectedResponse);
    });

    it('should throw an error if any of the promises fails', async () => {
      const errorMessage = 'An error occurred while fetching data';

      knowledgeAreaRepository.getKnowledgeAreas = jest.fn().mockRejectedValue(new Error(errorMessage));

      await expect(subjectController.getKnowledgeAreas()).rejects.toThrow(errorMessage);
    });
  });

  describe('getSubareas', () => {
    it('should return an array of subareas', async () => {
      const subareas = [
        {
          subareaid: 1,
          name: 'Algebra',
          knowledgeareaid: 1,
        },
        {
          subareaid: 2,
          name: 'Calculus',
          knowledgeareaid: 1,
        },
      ];

      subareaRepository.getSubareas = jest.fn().mockResolvedValue(subareas);

      const response = await subjectController.getSubareas();
      expect(response).toEqual(subareas);
    });

    it('should throw an error if any of the promises fails', async () => {
      const errorMessage = 'An error occurred while fetching data';

      subareaRepository.getSubareas = jest.fn().mockRejectedValue(new Error(errorMessage));

      await expect(subjectController.getSubareas()).rejects.toThrow(errorMessage);
    });
  });

  describe('getSubjects', () => {
    it('should return a list of subjects with professors', async () => {
      const mockResponse = [{ subjectId: 1 }, { subjectId: 2 }];
      const mockProfessors = [{ professorId: 1 }, { professorId: 2 }];
      subjectRepository.getSubjects.mockResolvedValue(mockResponse);
      professorRepository.getProfessorsofSubject.mockResolvedValue(mockProfessors);

      const result = await subjectController.getSubjects();

      expect(result).toEqual([
        { subjectId: 1, professors: mockProfessors },
        { subjectId: 2, professors: mockProfessors },
      ]);
    });

    it('should reject with an error if any repository call fails', async () => {
      const mockError = new Error('Failed to get subjects');
      subjectRepository.getSubjects.mockRejectedValue(mockError);

      await expect(subjectController.getSubjects()).rejects.toThrow(mockError);
    });
  });

  describe('deleteSubject', () => {
    it('should delete the subject with the given ID', async () => {
      const mockSubjectId = 1;
      const mockResponse = { success: true };
      subjectRepository.deleteSubject.mockResolvedValue(mockResponse);

      const result = await subjectController.deleteSubject(mockSubjectId);

      expect(result).toEqual(mockResponse);
      expect(subjectRepository.deleteSubject).toHaveBeenCalledWith(mockSubjectId);
    });

    it('should reject with an error if the repository call fails', async () => {
      const mockSubjectId = 1;
      const mockError = new Error('Failed to delete subject');
      subjectRepository.deleteSubject.mockRejectedValue(mockError);

      await expect(subjectController.deleteSubject(mockSubjectId)).rejects.toThrow(mockError);
    });
  });

  describe('getProfessors', () => {
    it('should return a list of professors', async () => {
      const mockResponse = [{ professorId: 1 }, { professorId: 2 }];
      professorRepository.getProfessors.mockResolvedValue(mockResponse);

      const result = await subjectController.getProfessors();

      expect(result).toEqual(mockResponse);
    });

    it('should reject with an error if the repository call fails', async () => {
      const mockError = new Error('Failed to get professors');
      professorRepository.getProfessors.mockRejectedValue(mockError);

      await expect(subjectController.getProfessors()).rejects.toThrow(mockError);
    });
  });

  describe('getSubject', () => {
    const input = { subjectId: 1 };

    it('should return subject, keywords, subareas, and professors', async () => {
      subjectRepository.getSubject.mockResolvedValue({ subjectId: 1, name: 'Math' });
      keywordRepository.getKeywordsOfSubject.mockResolvedValue([{ keywordId: 1, name: 'Algebra' }]);
      subareaRepository.getSubareasOfSubject.mockResolvedValue([{ subareaId: 1, name: 'Mathematics' }]);
      professorRepository.getProfessorsofSubject.mockResolvedValue([{ regnumber: 1234, name: 'John Doe' }]);

      const result = await subjectController.getSubject(input);

      expect(result).toEqual({
        subject: { subjectId: 1, name: 'Math' },
        keywords: [{ keywordId: 1, name: 'Algebra' }],
        subareas: [{ subareaId: 1, name: 'Mathematics' }],
        professors: [{ regnumber: 1234, name: 'John Doe' }]
      });
    });

    it('should reject with an error if any repository function throws an error', async () => {
      subjectRepository.getSubject.mockRejectedValue(new Error('Some error'));

      await expect(subjectController.getSubject(input)).rejects.toThrow('Some error');
    });
  });

  describe('updateSubject', () => {
    const input = {
      subject: { subjectId: 1, name: 'Math' },
      keywords: [{ keyword: 'Algebra' }],
      subareas: [{ subareaid: 1 }],
      professors: [{ regnumber: 1234 }]
    };

    it('should update subject and related entities', async () => {
      keywordRepository.removeKeywordsOfSubject.mockResolvedValue();
      subareaRepository.removeSubareasOfSubject.mockResolvedValue();
      professorRepository.removeProfessorsofSubject.mockResolvedValue();

      keywordRepository.addKeyword.mockResolvedValue({ keywordId: 1, keyword: 'Algebra' });
      keywordRepository.addKeywordSubjectRelation.mockResolvedValue();
      subareaRepository.addSubjectSubareaRelation.mockResolvedValue();
      professorRepository.addProfessorSubjectRelation.mockResolvedValue();

      subjectRepository.updateSubject.mockResolvedValue({ subjectId: 1, name: 'Math' });

      const result = await subjectController.updateSubject(input);

      expect(result).toEqual({
        subject: { subjectId: 1, name: 'Math' },
        keywords: [{ keywordId: 1, keyword: 'Algebra' }],
        subareas: [{ subareaid: 1 }],
        professors: [{ regnumber: 1234 }]
      });
    });

    it('should reject with an error if any repository function throws an error', async () => {
      keywordRepository.removeKeywordsOfSubject.mockRejectedValue(new Error('Some error'));

      await expect(subjectController.updateSubject(input)).rejects.toThrow('Some error');
    });
  });
});