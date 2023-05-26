const keywordController = require('../../../src/controller/KeywordController');
const keywordRepository = require('../../../src/repository/keywordRepository');

jest.mock('../../../src/repository/keywordRepository');

describe('keywordController', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getAllKeywords', () => {
    it('should return all keywords', async () => {
      const expectedKeywords = ['keyword1', 'keyword2'];
      keywordRepository.getAllKeywords.mockResolvedValue(expectedKeywords);

      const result = await keywordController.getAllKeywords();

      expect(keywordRepository.getAllKeywords).toHaveBeenCalledTimes(1);
      expect(result).toEqual(expectedKeywords);
    });
  });

  describe('addKeyword', () => {
    it('should add a keyword', async () => {
      const keyword = { keyword: 'newKeyword' };
      keywordRepository.addKeyword.mockResolvedValue(keyword);

      const result = await keywordController.addKeyword(keyword);

      expect(keywordRepository.addKeyword).toHaveBeenCalledTimes(1);
      expect(keywordRepository.addKeyword).toHaveBeenCalledWith(keyword.keyword);
      expect(result).toEqual(keyword);
    });

    it('should reject with an error if repository throws an error', async () => {
      const keyword = { keyword: 'newKeyword' };
      const errorMessage = 'Error adding keyword';
      keywordRepository.addKeyword.mockImplementation(() => {
        throw new Error(errorMessage);
      });

      await expect(keywordController.addKeyword(keyword)).rejects.toThrow(errorMessage);
    });
  });

  describe('getKeywordsAlternative', () => {
    it('should return alternative keywords', async () => {
      const expectedKeywords = ['keyword1', 'keyword2'];
      keywordRepository.getKeywordsAlternative.mockReturnValue(expectedKeywords);

      const result = await keywordController.getKeywordsAlternative();

      expect(keywordRepository.getKeywordsAlternative).toHaveBeenCalledTimes(1);
      expect(result).toEqual(expectedKeywords);
    });

    it('should reject with an error if repository throws an error', async () => {
      const errorMessage = 'Error retrieving alternative keywords';
      keywordRepository.getKeywordsAlternative.mockImplementation(() => {
        throw new Error(errorMessage);
      });

      await expect(keywordController.getKeywordsAlternative()).rejects.toThrow(errorMessage);
    });
  });

  describe('updateKeywordContent', () => {
    it('should update keyword content and return success message', async () => {
      const mockResponse = 'Keyword updated successfully';
      const mockKeywordId = 1;
      const mockNewKeyword = { keyword: 'updated keyword' };
      keywordRepository.updateKeyword.mockResolvedValue(mockResponse);
      const response = await keywordController.updateKeywordContent(
        mockKeywordId,
        mockNewKeyword
      );
      expect(response).toEqual(mockResponse);
    });

    it('should throw an error if there is an error in updating the keyword content', async () => {
      const mockError = new Error('Error updating keyword content');
      const mockKeywordId = 1;
      const mockNewKeyword = { keyword: 'updated keyword' };
      keywordRepository.updateKeyword.mockRejectedValue(mockError);
      await expect(
        keywordController.updateKeywordContent(mockKeywordId, mockNewKeyword)
      ).rejects.toThrow(mockError);
    });
  });

  describe('updateSubjectKeyword', () => {
    it('should update keyword subject and return success message', async () => {
      const mockResponse = 'Keyword subject updated successfully';
      const mockKeywordId = 1;
      const mockSubjectId = 1;
      keywordRepository.updateSubjectKeyword.mockResolvedValue(mockResponse);
      const response = await keywordController.updateSubjectKeyword(
        mockKeywordId,
        mockSubjectId
      );
      expect(response).toEqual(mockResponse);
    });

    it('should throw an error if there is an error in updating the keyword subject', async () => {
      const mockError = new Error('Error updating keyword subject');
      const mockKeywordId = 1;
      const mockSubjectId = 1;
      keywordRepository.updateSubjectKeyword.mockRejectedValue(mockError);
      await expect(
        keywordController.updateSubjectKeyword(mockKeywordId, mockSubjectId)
      ).rejects.toThrow(mockError);
    });
  });

  describe('deleteKeyword', () => {
    it('should delete keyword successfully', async () => {
      const mockKeywordId = 1;
      keywordRepository.deleteKeyword = jest.fn(() => Promise.resolve(true));
      const result = await keywordController.deleteKeyword(mockKeywordId);
      expect(keywordRepository.deleteKeyword).toHaveBeenCalled();
      expect(result).toBe(true);
    });
  
    it('should throw an error if there is an error in deleting the keyword', async () => {
      const mockError = new Error('Error deleting keyword');
      const mockKeywordId = 1;
      keywordRepository.deleteKeyword.mockRejectedValue(mockError);
      await expect(keywordController.deleteKeyword(mockKeywordId)).rejects.toThrow(mockError);
      expect(keywordRepository.deleteKeyword).toHaveBeenCalledWith(mockKeywordId);
    });
  });

  describe('getSubjects', () => {
    it('should return subjects from repository', async () => {
      const subjects = ['Subject A', 'Subject B', 'Subject C'];
      keywordRepository.getSubjects.mockResolvedValue(subjects);

      const result = await keywordController.getSubjects();

      expect(keywordRepository.getSubjects).toHaveBeenCalledTimes(1);
      expect(result).toEqual(subjects);
    });

    it('should reject with an error if repository throws an error', async () => {
      const error = new Error('Unable to fetch subjects');
      keywordRepository.getSubjects.mockRejectedValue(error);

      await expect(keywordController.getSubjects()).rejects.toThrow(error);
    });
  });

  describe('addKeywordSubjectRelation', () => {
    const payload = {
      keywordId: 1,
      subjectId: 2,
    };

    it('should add a keyword-subject relation and resolve', async () => {
      keywordRepository.addKeywordSubjectRelation.mockResolvedValue();

      await expect(keywordController.addKeywordSubjectRelation(payload)).resolves.toBeUndefined();
      expect(keywordRepository.addKeywordSubjectRelation).toHaveBeenCalledTimes(1);
      expect(keywordRepository.addKeywordSubjectRelation).toHaveBeenCalledWith(payload);
    });

    it('should reject with an error if repository throws an error', async () => {
      const error = new Error('Unable to add keyword-subject relation');
      keywordRepository.addKeywordSubjectRelation.mockRejectedValue(error);

      await expect(keywordController.addKeywordSubjectRelation(payload)).rejects.toThrow(error);
    });
  });
});