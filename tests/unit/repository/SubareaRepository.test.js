const sequelize = require('../../../src/db/AppDb');
const Subarea = require('../../../src/db/model/Subarea');
const Identifies = require('../../../src/db/model/Identifies');
const subareaRepository = require('../../../src/repository/subareaRepository');

jest.mock('../../../src/db/AppDb', () => ({
  query: jest.fn(),
}));

jest.mock('../../../src/db/model/Subarea', () => {
  return {
    create: jest.fn(),
    findAll: jest.fn(),
  };
});

jest.mock('../../../src/db/model/Identifies', () => {
  return {
    create: jest.fn(),
  };
});

describe('Repository', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('addSubarea', () => {
    it('should add a new subarea', async () => {
      const input = {
        knowledgeAreaId: 1,
        description: 'Test Subarea',
      };
      const expectedResult = { id: 1, ...input };
      Subarea.create.mockResolvedValue(expectedResult);

      const result = await subareaRepository.addSubarea(input);

      expect(Subarea.create).toHaveBeenCalledTimes(1);
      expect(Subarea.create).toHaveBeenCalledWith(input);
      expect(result).toEqual(expectedResult);
    });

    it('should reject with an error if subarea creation fails', async () => {
      const input = {
        knowledgeAreaId: 1,
        description: 'Test Subarea',
      };
      const error = new Error('Failed to create subarea');
      Subarea.create.mockRejectedValue(error);

      await expect(subareaRepository.addSubarea(input)).rejects.toThrow(error);
      expect(Subarea.create).toHaveBeenCalledTimes(1);
      expect(Subarea.create).toHaveBeenCalledWith(input);
    });
  });

  describe('addSubjectSubareaRelation', () => {
    it('should add a new subject-subarea relation', async () => {
      const input = {
        subareaid: 1,
        subjectid: 1,
      };
      const expectedResult = { 
        id: 1,
        subAreaId: input.subareaid,
        subjectId: input.subjectid,
      };
      Identifies.create.mockResolvedValue(expectedResult);

      const result = await subareaRepository.addSubjectSubareaRelation(input);

      expect(Identifies.create).toHaveBeenCalledWith({
        subAreaId: input.subareaid,
        subjectId: input.subjectid,
      });
      expect(result).toEqual(expectedResult);
    });
  });

  describe('getSubareas', () => {
    it('should return all subareas', async () => {
      const expectedResult = [{ id: 1, description: 'Subarea 1' }, { id: 2, description: 'Subarea 2' }];
      Subarea.findAll.mockResolvedValue(expectedResult);

      const result = await subareaRepository.getSubareas();

      expect(Subarea.findAll).toHaveBeenCalledTimes(1);
      expect(result).toEqual(expectedResult);
    });

    it('should reject with an error if subarea retrieval fails', async () => {
      const error = new Error('Failed to retrieve subareas');
      Subarea.findAll.mockRejectedValue(error);

      await expect(subareaRepository.getSubareas()).rejects.toThrow(error);
      expect(Subarea.findAll).toHaveBeenCalledTimes(1);
    });
  });

  describe('getSubareasOfSubject', () => {
    it('should return subareas of a subject', async () => {
      const input = { subjectId: 1 };
      const expectedResult = [{ subAreaId: 1, description: 'Subarea 1' }, { subAreaId: 2, description: 'Subarea 2' }];
      sequelize.query.mockResolvedValue(expectedResult);

      const result = await subareaRepository.getSubareasOfSubject(input);

      expect(sequelize.query).toHaveBeenCalledTimes(1);
      expect(sequelize.query).toHaveBeenCalledWith(
        `select sab."subAreaId", sab.description from "Subject" sb \
      inner join "Identifies" id on sb."subjectId" = id."subjectId" \
      inner join "Subarea" sab on id."subAreaId" = sab."subAreaId" \
      where sb."subjectId" = ${input.subjectid}`
      );
      expect(result).toEqual(expectedResult);
    });

    it('should reject with an error if subarea retrieval fails', async () => {
      const input = { subjectId: 1 };
      const error = new Error('Failed to retrieve subareas of subject');
      sequelize.query.mockRejectedValue(error);

      await expect(subareaRepository.getSubareasOfSubject(input)).rejects.toThrow(error);
      expect(sequelize.query).toHaveBeenCalledTimes(1);
    });
  });

  describe('removeSubareasOfSubject', () => {
    it('should remove subareas of a subject', async () => {
      const input = { subjectId: 1 };
      const expectedResult = { affectedRows: 2 };
      sequelize.query.mockResolvedValue(expectedResult);

      const result = await subareaRepository.removeSubareasOfSubject(input);

      expect(sequelize.query).toHaveBeenCalledTimes(1);
      expect(sequelize.query).toHaveBeenCalledWith(
        `delete from "Identifies" id \
      where id."subjectId" in \
      ( \
        select sb."subjectId" \
        from "Subject" sb \
        inner join "Identifies" id \
        on sb."subjectId" = id."subjectId" \
        where sb."subjectId" = ${input.subjectId} \
      ) \
      `
      );
      expect(result).toEqual(expectedResult);
    });

    it('should reject with an error if subarea removal fails', async () => {
      const input = { subjectid: 1 };
      const error = new Error('Failed to remove subareas of subject');
      sequelize.query.mockRejectedValue(error);

      await expect(subareaRepository.removeSubareasOfSubject(input)).rejects.toThrow(error);
      expect(sequelize.query).toHaveBeenCalledTimes(1);
    });
  });
});