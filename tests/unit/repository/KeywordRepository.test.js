const keywordRepository = require('../../../src/repository/keywordRepository');
const Keyword = require('../../../src/db/model/Keyword');
const Abstracts = require('../../../src/db/model/Abstracts');
const Summarize = require('../../../src/db/model/Summarize');
const Subject = require('../../../src/db/model/Subject');
const sequelize = require('../../../src/db/AppDb');

jest.mock('../../../src/db/AppDb', () => ({
  query: jest.fn(),
}));

jest.mock('../../../src/db/model/Keyword', () => {
  return {
    create: jest.fn(),
    findAll: jest.fn(),
    bulkCreate: jest.fn(),
    update: jest.fn(),
  };
});

jest.mock('../../../src/db/model/Abstracts', () => {
  return {
    create: jest.fn(),
  };
});

jest.mock('../../../src/db/model/Summarize', () => {
  return {
    create: jest.fn(),
    update: jest.fn(),
  };
});

jest.mock('../../../src/db/model/Subject', () => {
  return {
    create: jest.fn(),
  };
});

describe('KeywordRepository', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('addKeyword', () => {
    test('should add a keyword', async () => {
      const createSpy = jest.spyOn(Keyword, 'create').mockResolvedValue({ keywordId: 1 });
      const keyword = 'example';

      const response = await keywordRepository.addKeyword(keyword);
      expect(response).toBeDefined();
      expect(createSpy).toHaveBeenCalledWith({ keyword });
      expect(response.keywordId).toEqual(1);
    });

    test('should reject when adding a keyword fails', async () => {
      const createSpy = jest.spyOn(Keyword, 'create').mockRejectedValue(new Error('Failed to add keyword'));
      const keyword = 'example';

      await expect(keywordRepository.addKeyword(keyword)).rejects.toThrowError('Failed to add keyword');
      expect(createSpy).toHaveBeenCalledWith({ keyword });
    });
  });

  describe('addManyKeywords', () => {
    test('should add multiple keywords', async () => {
      const bulkCreateSpy = jest.spyOn(Keyword, 'bulkCreate').mockResolvedValue([{ keywordId: 1 }, { keywordId: 2 }]);
      const keywords = ['keyword1', 'keyword2'];

      const response = await keywordRepository.addManyKeywords(keywords);
      expect(response).toBeDefined();
      expect(response.length).toEqual(2);
      expect(response[0].keywordId).toEqual(1);
      expect(response[1].keywordId).toEqual(2);
    });

    test('should reject when adding multiple keywords fails', async () => {
      const bulkCreateSpy = jest.spyOn(Keyword, 'bulkCreate').mockRejectedValue(new Error('Failed to add keywords'));
      const keywords = ['keyword1', 'keyword2'];

      await expect(keywordRepository.addManyKeywords(keywords)).rejects.toThrowError('Failed to add keywords');
    });
  });

  describe('getAllKeywords', () => {
    test('should get all keywords in descending order', async () => {
      const findAllSpy = jest.spyOn(Keyword, 'findAll').mockResolvedValue([{ keywordId: 1 }, { keywordId: 2 }]);

      const response = await keywordRepository.getAllKeywords();
      expect(response).toBeDefined();
      expect(findAllSpy).toHaveBeenCalledWith({ order: [['keywordId', 'DESC']] });
      expect(response.length).toEqual(2);
      expect(response[0].keywordId).toEqual(1);
      expect(response[1].keywordId).toEqual(2);
    });

    test('should reject when getting all keywords fails', async () => {
      const findAllSpy = jest.spyOn(Keyword, 'findAll').mockRejectedValue(new Error('Failed to get all keywords'));

      await expect(keywordRepository.getAllKeywords()).rejects.toThrowError('Failed to get all keywords');
      expect(findAllSpy).toHaveBeenCalledWith({ order: [['keywordId', 'DESC']] });
    });
  });

  describe('getKeywordByName', () => {
    test('should get keywords by name', async () => {
      const findAllSpy = jest.spyOn(Keyword, 'findAll').mockResolvedValue([{ keywordId: 1 }, { keywordId: 2 }]);
      const keyword = 'example';

      const response = await keywordRepository.getKeywordByName(keyword);
      expect(response).toBeDefined();
      expect(findAllSpy).toHaveBeenCalledWith({ where: { keyword } });
      expect(response.length).toEqual(2);
      expect(response[0].keywordId).toEqual(1);
      expect(response[1].keywordId).toEqual(2);
    });

    test('should reject when getting keywords by name fails', async () => {
      const findAllSpy = jest.spyOn(Keyword, 'findAll').mockRejectedValue(new Error('Failed to get keywords by name'));
      const keyword = 'example';

      await expect(keywordRepository.getKeywordByName(keyword)).rejects.toThrowError('Failed to get keywords by name');
      expect(findAllSpy).toHaveBeenCalledWith({ where: { keyword } });
    });
  });

  describe('getKeywordById', () => {
    test('should get a keyword by ID', async () => {
      const findAllSpy = jest.spyOn(Keyword, 'findAll').mockResolvedValue([{ keywordId: 1 }]);
      const keywordId = 1;

      const response = await keywordRepository.getKeywordById(keywordId);
      expect(response).toBeDefined();
      expect(findAllSpy).toHaveBeenCalledWith({keywordId});
      expect(response.length).toEqual(1);
      expect(response[0].keywordId).toEqual(1);
    });

    test('should reject when getting a keyword by ID fails', async () => {
      const findAllSpy = jest.spyOn(Keyword, 'findAll').mockRejectedValue(new Error('Failed to get keyword by ID'));
      const keywordId = 1;

      await expect(keywordRepository.getKeywordById(keywordId)).rejects.toThrowError('Failed to get keyword by ID');
    });
  });

  describe('getProjectKeywords', () => {
    test('should get keywords for a project', async () => {
      const querySpy = jest.spyOn(sequelize, 'query').mockResolvedValue([{ keyword: 'example', keywordId: 1, main: true }]);
      const projectId = 1;

      const response = await keywordRepository.getProjectKeywords(projectId);
      expect(response).toBeDefined();
      expect(querySpy).toHaveBeenCalledWith(`SELECT K.keyword, K."keywordId", A.main FROM "Abstracts" as A JOIN "Keyword" as K on A."keywordId" = K."keywordId" WHERE "projectId" = ${projectId}`);
      expect(response.length).toEqual(1);
      expect(response[0].keyword).toEqual('example');
      expect(response[0].keywordId).toEqual(1);
      expect(response[0].main).toEqual(true);
    });

    test('should reject when getting project keywords fails', async () => {
      const querySpy = jest.spyOn(sequelize, 'query').mockRejectedValue(new Error('Failed to get project keywords'));
      const projectId = 1;

      await expect(keywordRepository.getProjectKeywords(projectId)).rejects.toThrowError('Failed to get project keywords');
      expect(querySpy).toHaveBeenCalledWith(`SELECT K.keyword, K."keywordId", A.main FROM "Abstracts" as A JOIN "Keyword" as K on A."keywordId" = K."keywordId" WHERE "projectId" = ${projectId}`);
    });
  });

  describe('addKeywordSubjectRelation', () => {
    test('should add a keyword-subject relation', async () => {
      const createSpy = jest.spyOn(Summarize, 'create').mockResolvedValue({ keywordId: 1, subjectId: 1 });
      const payload = { keywordid: 1, subjectid: 1 };

      const response = await keywordRepository.addKeywordSubjectRelation(payload);
      expect(response).toBeDefined();
      expect(createSpy).toHaveBeenCalledWith({ keywordId: 1, subjectId: 1 });
      expect(response.keywordId).toEqual(1);
      expect(response.subjectId).toEqual(1);
    });

    test('should reject when adding a keyword-subject relation fails', async () => {
      const createSpy = jest.spyOn(Summarize, 'create').mockRejectedValue(new Error('Failed to add keyword-subject relation'));
      const payload = { keywordid: 1, subjectid: 1 };

      await expect(keywordRepository.addKeywordSubjectRelation(payload)).rejects.toThrowError('Failed to add keyword-subject relation');
      expect(createSpy).toHaveBeenCalledWith({ keywordId: 1, subjectId: 1 });
    });
  });

  describe('getKeywordsAvailbleToProject', () => {
    test('should get available keywords for a project', async () => {
      const querySpy = jest.spyOn(sequelize, 'query').mockResolvedValue([{ keywordId: 1, keyword: 'example' }]);
  
      const response = await keywordRepository.getKeywordsAvailbleToProject();
      expect(response).toBeDefined();
      expect(querySpy).toHaveBeenCalledWith('SELECT DISTINCT k."keywordId", k.keyword FROM "Summarize" JOIN "Subject" s ON "Summarize"."subjectId" = s."subjectId" JOIN "Keyword" k ON "Summarize"."keywordId" = k."keywordId" WHERE not(k.deleted) and not(s.deleted)');
      expect(response.length).toEqual(1);
      expect(response[0].keywordId).toEqual(1);
      expect(response[0].keyword).toEqual('example');
    });
  
    test('should reject when getting available keywords for a project fails', async () => {
      const querySpy = jest.spyOn(sequelize, 'query').mockRejectedValue(new Error('Failed to get available keywords for a project'));
  
      await expect(keywordRepository.getKeywordsAvailbleToProject()).rejects.toThrowError('Failed to get available keywords for a project');
      expect(querySpy).toHaveBeenCalledWith('SELECT DISTINCT k."keywordId", k.keyword FROM "Summarize" JOIN "Subject" s ON "Summarize"."subjectId" = s."subjectId" JOIN "Keyword" k ON "Summarize"."keywordId" = k."keywordId" WHERE not(k.deleted) and not(s.deleted)');
    });
  });

  describe('getKeywordAvailbleToSubject', () => {
    test('should get available keywords for a subject', async () => {
      const querySpy = jest.spyOn(sequelize, 'query').mockResolvedValue([[{ keywordId: 1, keyword: 'example' }]]);
  
      const response = await keywordRepository.getKeywordAvailbleToSubject();
      expect(response).toBeDefined();
      expect(querySpy).toHaveBeenCalledWith('SELECT k."keywordId", k.keyword FROM "Keyword" k LEFT JOIN "Summarize" s ON k."keywordId" = s."keywordId" WHERE s."keywordId" IS NULL and not(k.deleted)');
      expect(response.length).toEqual(1);
      expect(response[0].keywordId).toEqual(1);
      expect(response[0].keyword).toEqual('example');
    });
  
    test('should reject when getting available keywords for a subject fails', async () => {
      const querySpy = jest.spyOn(sequelize, 'query').mockRejectedValue(new Error('Failed to get available keywords for a subject'));
  
      await expect(keywordRepository.getKeywordAvailbleToSubject()).rejects.toThrowError('Failed to get available keywords for a subject');
      expect(querySpy).toHaveBeenCalledWith('SELECT k."keywordId", k.keyword FROM "Keyword" k LEFT JOIN "Summarize" s ON k."keywordId" = s."keywordId" WHERE s."keywordId" IS NULL and not(k.deleted)');
    });
  });

  describe('getKeywordsAlternative', () => {
    it('should fetch alternative keywords', async () => {
      const expectedResults = ['keyword1', 'keyword2'];
      const mockQuery = jest.spyOn(sequelize, 'query').mockResolvedValue(expectedResults);

      const results = await keywordRepository.getKeywordsAlternative();

      expect(mockQuery).toHaveBeenCalledWith(
        'SELECT k."keywordId", k.keyword, s.name as "subjectName", s."subjectId", array_agg(c."userId") FROM "Summarize" su JOIN "Subject" s ON su."subjectId" = s."subjectId" JOIN "Keyword" k ON su."keywordId" = k."keywordId" and k.deleted is not true inner join "Lectures" l on l."subjectId" = s."subjectId" inner join "User_Properties" p on l."userId" = p."userId" inner join "User" c on p."userId" = c."userId" GROUP BY k."keywordId", s.name,s."subjectId" ORDER BY k."keywordId";',
      );
      expect(results).toEqual(expectedResults);
    });

    it('should reject with an error if the query fails', async () => {
      const mockQuery = jest.spyOn(sequelize, 'query').mockRejectedValue(new Error('Database error'));

      await expect(keywordRepository.getKeywordsAlternative()).rejects.toThrow('Database error');
      expect(mockQuery).toHaveBeenCalled();
    });
  });

  describe('getSubjects', () => {
    it('should fetch subjects', async () => {
      const expectedResults = [{ value: 1, text: 'Subject 1' }, { value: 2, text: 'Subject 2' }];
      const mockQuery = jest.spyOn(sequelize, 'query').mockResolvedValue(expectedResults);

      const results = await keywordRepository.getSubjects();

      expect(mockQuery).toHaveBeenCalledWith(
        'SELECT "subjectId" as value, name as text FROM "Subject";',
      );
      expect(results).toEqual(expectedResults);
    });

    it('should reject with an error if the query fails', async () => {
      const mockQuery = jest.spyOn(sequelize, 'query').mockRejectedValue(new Error('Database error'));

      await expect(keywordRepository.getSubjects()).rejects.toThrow('Database error');
      expect(mockQuery).toHaveBeenCalled();
    });
  });

  describe('updateKeyword', () => {
    it('should update a keyword', async () => {
      const keywordId = 1;
      const newKeyword = 'new keyword';
      const expectedResponse = { keywordId: 1, keyword: 'new keyword' };
      const mockUpdate = jest.spyOn(Keyword, 'update').mockResolvedValue([1, [expectedResponse]]);

      const response = await keywordRepository.updateKeyword(keywordId, newKeyword);

      expect(mockUpdate).toHaveBeenCalledWith(
        { keyword: newKeyword },
        { where: { keywordId }, returning: true },
      );
      expect(response).toEqual(expectedResponse);
    });

    it('should reject with an error if the update fails', async () => {
      const keywordId = 1;
      const newKeyword = 'new keyword';
      const mockUpdate = jest.spyOn(Keyword, 'update').mockRejectedValue(new Error('Update error'));

      await expect(keywordRepository.updateKeyword(keywordId, newKeyword)).rejects.toThrow('Update error');
      expect(mockUpdate).toHaveBeenCalled();
    });
  });

  describe('deleteKeyword', () => {
    it('should delete a keyword', async () => {
      const keywordId = 1;
      const expectedResponse = [{ keywordId: 1, deleted: true }];
      const mockUpdate = jest.spyOn(Keyword, 'update').mockResolvedValue([1, expectedResponse]);

      const response = await keywordRepository.deleteKeyword(keywordId);

      expect(mockUpdate).toHaveBeenCalledWith(
        { deleted: true },
        { where: { keywordId }, returning: true },
      );
      expect(response).toEqual(expectedResponse);
    });

    it('should reject with an error if the deletion fails', async () => {
      const keywordId = 1;
      const mockUpdate = jest.spyOn(Keyword, 'update').mockRejectedValue(new Error('Deletion error'));

      await expect(keywordRepository.deleteKeyword(keywordId)).rejects.toThrow('Deletion error');
      expect(mockUpdate).toHaveBeenCalled();
    });
  });

  describe('updateSubjectKeyword', () => {
    it('should update the keyword of a subject', async () => {
      const keywordId = 1;
      const subjectId = 1;
      const expectedResponse = [{ keywordId: 1, subjectId: 1 }];
      const mockUpdate = jest.spyOn(Summarize, 'update').mockResolvedValue([1, expectedResponse]);

      const response = await keywordRepository.updateSubjectKeyword(keywordId, subjectId);

      expect(mockUpdate).toHaveBeenCalledWith(
        { keywordId, subjectId },
        { where: { keywordId }, returning: true },
      );
      expect(response).toEqual(expectedResponse);
    });

    it('should reject with an error if the update fails', async () => {
      const keywordId = 1;
      const subjectId = 1;
      const mockUpdate = jest.spyOn(Summarize, 'update').mockRejectedValue(new Error('Update error'));

      await expect(keywordRepository.updateSubjectKeyword(keywordId, subjectId)).rejects.toThrow('Update error');
      expect(mockUpdate).toHaveBeenCalled();
    });
  });

  describe('getKeywordsOfSubject', () => {
    it('should fetch keywords of a subject', async () => {
      const subjectId = 1;
      const expectedResults = [{ keyword: 'keyword1', keywordId: 1 }, { keyword: 'keyword2', keywordId: 2 }];
      const mockQuery = jest.spyOn(sequelize, 'query').mockResolvedValue(expectedResults);

      const results = await keywordRepository.getKeywordsOfSubject({ subjectid: subjectId });

      expect(mockQuery).toHaveBeenCalledWith(
        `select kw.keyword, kw."keywordId" from "Subject" sb \
      inner join "Summarize" sm on sb."subjectId" = sm."subjectId" \
      inner join "Keyword" kw on sm."keywordId" = kw."keywordId" \
      where sb."subjectId" = ${subjectId}`,
      );
      expect(results).toEqual(expectedResults);
    });

    it('should reject with an error if the query fails', async () => {
      const subjectId = 1;
      const mockQuery = jest.spyOn(sequelize, 'query').mockRejectedValue(new Error('Database error'));

      await expect(keywordRepository.getKeywordsOfSubject({ subjectid: subjectId })).rejects.toThrow('Database error');
      expect(mockQuery).toHaveBeenCalled();
    });
  });

  describe('removeKeywordsOfSubject', () => {
    it('should remove keywords of a subject', async () => {
      const subjectId = 1;
      const expectedResults = ['result1', 'result2'];
      const mockQuery = jest.spyOn(sequelize, 'query').mockResolvedValue(expectedResults);

      const results = await keywordRepository.removeKeywordsOfSubject({ subjectId });

      expect(mockQuery).toHaveBeenCalledWith(
        `delete from "Summarize" sm \
      where sm."subjectId" in \
      ( \
        select sb."subjectId" \
        from "Subject" sb \
        inner join "Summarize" sm \
        on sb."subjectId" = sm."subjectId" \
        where sb."subjectId" = ${subjectId} \
      )`,
      );
      expect(results).toEqual(expectedResults);
    });

    it('should reject with an error if the query fails', async () => {
      const subjectId = 1;
      const mockQuery = jest.spyOn(sequelize, 'query').mockRejectedValue(new Error('Database error'));

      await expect(keywordRepository.removeKeywordsOfSubject({ subjectid: subjectId })).rejects.toThrow('Database error');
      expect(mockQuery).toHaveBeenCalled();
    });
  });
});