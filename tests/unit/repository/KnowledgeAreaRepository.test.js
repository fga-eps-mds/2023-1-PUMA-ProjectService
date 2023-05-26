const knowledge_Area = require('../../../src/db/model/Knowledge_Area');
const knowledgeAreaRepository = require('../../../src/repository/knowledgeArea');

jest.mock('../../../src/db/model/Knowledge_Area', () => {
  return {
    create: jest.fn(),
    findAll: jest.fn(),
  };
});

describe('addKnowledgeArea', () => {
  it('should add a knowledge area to the database', async () => {
    const input = { knowledgeArea: 'Test Knowledge Area' };
    const knowledgeAreaId = 1;
    knowledge_Area.create.mockResolvedValue({ knowledgeAreaId });
    const result = await knowledgeAreaRepository.addKnowledgeArea(input);
    expect(result).toBe(knowledgeAreaId);
  });

  it('should throw an error when no input is provided', async () => {
    await expect(knowledgeAreaRepository.addKnowledgeArea()).rejects.toThrow();
  });
});

describe('getKnowledgeAreas', () => {
  it('should return an array of knowledge areas', async () => {
    const knowledgeAreas = [{ knowledgeAreaId: 1, knowledgeArea: 'Test Knowledge Area' }];
    knowledge_Area.findAll.mockResolvedValue(knowledgeAreas);
    const result = await knowledgeAreaRepository.getKnowledgeAreas();
    expect(result).toEqual(knowledgeAreas);
  });

  it('should throw an error when an error occurs in the database', async () => {
    const error = new Error('Database error');
    knowledge_Area.findAll.mockRejectedValue(error);
    await expect(knowledgeAreaRepository.getKnowledgeAreas()).rejects.toThrow(error);
  });
});