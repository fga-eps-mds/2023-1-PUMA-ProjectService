const classController = require('../../../src/controller/ClassController');
const classRepository = require('../../../src/repository/ClassRepository');

jest.mock('../../../src/repository/ClassRepository');

describe('ClassController', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getClasses', () => {
    it('should return all classes', async () => {
      const classes = [{ id: 1, name: 'Class 1' }, { id: 2, name: 'Class 2' }];
      classRepository.getClasses.mockResolvedValue(classes);

      const response = await classController.getClasses();

      expect(response).toEqual(classes);
      expect(classRepository.getClasses).toHaveBeenCalledTimes(1);
    });

    it('should throw an error if an error occurs in the repository', async () => {
      const error = new Error('Something went wrong');
      classRepository.getClasses.mockRejectedValue(error);

      await expect(classController.getClasses()).rejects.toThrow(error);
      expect(classRepository.getClasses).toHaveBeenCalledTimes(1);
    });
  });

  describe('deleteClass', () => {
    it('should delete a class', async () => {
      const classId = 1;
      classRepository.deleteClass.mockResolvedValue(true);

      const response = await classController.deleteClass(classId);

      expect(response).toBe(true);
      expect(classRepository.deleteClass).toHaveBeenCalledWith(classId);
    });

    it('should throw an error if an error occurs in the repository', async () => {
      const classId = 1;
      const error = new Error('Something went wrong');
      classRepository.deleteClass.mockRejectedValue(error);

      await expect(classController.deleteClass(classId)).rejects.toThrow(error);
      expect(classRepository.deleteClass).toHaveBeenCalledWith(classId);
    });
  });

  describe('getClass', () => {
    it('should return a class by id', async () => {
      const classItem = { id: 1, name: 'Class 1' };
      const input = { id: 1 };
      classRepository.getClass.mockResolvedValue(classItem);

      const response = await classController.getClass(input);

      expect(response).toEqual({ classItem });
      expect(classRepository.getClass).toHaveBeenCalledWith(input);
    });

    it('should throw an error if an error occurs in the repository', async () => {
      const input = { id: 1 };
      const error = new Error('Something went wrong');
      classRepository.getClass.mockRejectedValue(error);

      await expect(classController.getClass(input)).rejects.toThrow(error);
      expect(classRepository.getClass).toHaveBeenCalledWith(input);
    });
  });

  describe('updateClass', () => {
    it('should update a class', async () => {
      const classItem = { id: 1, name: 'Class 1' };
      const input = { classItem };
      classRepository.updateClass.mockResolvedValue(classItem);

      const response = await classController.updateClass(input);

      expect(response).toEqual({ classItem });
      expect(classRepository.updateClass).toHaveBeenCalledWith(classItem);
    });

    it('should throw an error if an error occurs in the repository', async () => {
      const classItem = { id: 1, name: 'Class 1' };
      const input = { classItem };
      const error = new Error('Something went wrong');
      classRepository.updateClass.mockRejectedValue(error);

      await expect(classController.updateClass(input)).rejects.toThrow(error);
      expect(classRepository.updateClass).toHaveBeenCalledWith(classItem);
    });
  });
});