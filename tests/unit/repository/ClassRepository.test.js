const Classes = require('../../../src/db/model/Classes');
const Classes_Teacher = require('../../../src/db/model/Classes_Teacher');
const Classes_Schedule = require('../../../src/db/model/Classes_Schedule');
const classRepository = require('../../../src/repository/ClassRepository');

jest.mock('../../../src/db/model/Classes', () => {
  return {
    create: jest.fn(),
    findAll: jest.fn(),
    bulkCreate: jest.fn(),
    update: jest.fn(),
  };
});

jest.mock('../../../src/db/model/Classes_Teacher', () => {
  return {
    create: jest.fn(),
    destroy: jest.fn(),
    findAll: jest.fn(),
  };
});

jest.mock('../../../src/db/model/Classes_Schedule', () => {
  return {
    create: jest.fn(),
    update: jest.fn(),
    findAll: jest.fn(),
    destroy: jest.fn(),
  };
});

describe('ClassesRepository', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getClasses', () => {
    it('should resolve with the response from Classes.findAll', async () => {
      const expectedResult = ['class1', 'class2'];
      Classes.findAll.mockResolvedValue(expectedResult);

      const result = await classRepository.getClasses();

      expect(result).toEqual(expectedResult);
      expect(Classes.findAll).toHaveBeenCalled();
    });

    it('should reject with the error from Classes.findAll', async () => {
      const expectedError = new Error('Database error');
      Classes.findAll.mockRejectedValue(expectedError);

      await expect(classRepository.getClasses()).rejects.toThrow(expectedError);
      expect(Classes.findAll).toHaveBeenCalled();
    });
  });

  describe('getClass', () => {
    it('should resolve with the combined response from findAll calls', async () => {
      const classid = 123;
      const expectedClassResult = ['class1'];
      const expectedTeacherResult = ['teacher1'];
      const expectedScheduleResult = ['schedule1'];

      Classes.findAll.mockResolvedValueOnce(expectedClassResult);
      Classes_Teacher.findAll.mockResolvedValueOnce(expectedTeacherResult);
      Classes_Schedule.findAll.mockResolvedValueOnce(expectedScheduleResult);

      const result = await classRepository.getClass({ classid });

      expect(result).toEqual({
        class: expectedClassResult[0],
        teachers: expectedTeacherResult,
        schedules: expectedScheduleResult,
      });
      expect(Classes.findAll).toHaveBeenCalledWith({
        where: { classId: classid },
      });
      expect(Classes_Teacher.findAll).toHaveBeenCalledWith({
        where: { classId: classid },
      });
      expect(Classes_Schedule.findAll).toHaveBeenCalledWith({
        where: { classId: classid },
      });
    });
  });

  describe('updateClass', () => {
    it('should update existing records and resolve with the response from Classes.update', async () => {
      const input = {
        subjectId: 1,
        classCode: 'CODE',
        year: 2023,
        semester: 1,
        password: 'password',
        classid: 123,
        userId: 1,
        classesTeacher: [1, 2],
        classesSchedule: [
          { day: 'Monday', start: '9:00 AM', end: '11:00 AM' },
          { day: 'Wednesday', start: '1:00 PM', end: '3:00 PM' },
        ],
      };
      const expectedResponse = [1];

      Classes.update.mockResolvedValue(expectedResponse);
      Classes_Teacher.destroy.mockResolvedValue({});
      Classes_Teacher.create.mockResolvedValue({});
      Classes_Schedule.destroy.mockResolvedValue({});
      Classes_Schedule.create.mockResolvedValue({});

      const result = await classRepository.updateClass(input);

      expect(result).toEqual(expectedResponse);
      expect(Classes.update).toHaveBeenCalledWith(
        {
          subjectId: input.subjectId,
          classCode: input.classCode,
          year: input.year,
          semester: input.semester,
          password: input.password,
        },
        { where: { classId: input.classid } }
      );
      expect(Classes_Teacher.destroy).toHaveBeenCalledWith({ where: { classId: input.classid } });
      expect(Classes_Teacher.create).toHaveBeenCalledTimes(2);
      expect(Classes_Schedule.destroy).toHaveBeenCalledWith({ where: { classId: input.classid } });
      expect(Classes_Schedule.create).toHaveBeenCalledTimes(2);
    });

    it('should reject with the error if creating new records fails', async () => {
      const input = {
        subjectId: 1,
        classCode: 'CODE',
        year: 2023,
        semester: 1,
        password: 'password',
        classid: '0',
        userId: 1,
        classesTeacher: [1, 2],
        classesSchedule: [
          { day: 'Monday', start: '9:00 AM', end: '11:00 AM' },
          { day: 'Wednesday', start: '1:00 PM', end: '3:00 PM' },
        ],
      };
      const expectedError = new Error('Database error');

      Classes.create.mockRejectedValue(expectedError);

      await expect(classRepository.updateClass(input)).rejects.toThrow(expectedError);
      expect(Classes.create).toHaveBeenCalledWith({
        subjectId: input.subjectId,
        classCode: input.classCode,
        year: input.year,
        semester: input.semester,
        password: input.password,
      });
      expect(Classes_Teacher.create).not.toHaveBeenCalled();
      expect(Classes_Schedule.create).not.toHaveBeenCalled();
    });

    it('should reject with the error if updating existing records fails', async () => {
      const input = {
        subjectId: 1,
        classCode: 'CODE',
        year: 2023,
        semester: 1,
        password: 'password',
        classid: 123,
        userId: 1,
        classesTeacher: [1, 2],
        classesSchedule: [
          { day: 'Monday', start: '9:00 AM', end: '11:00 AM' },
          { day: 'Wednesday', start: '1:00 PM', end: '3:00 PM' },
        ],
      };
      const expectedError = new Error('Database error');

      Classes.update.mockRejectedValue(expectedError);

      await expect(classRepository.updateClass(input)).rejects.toThrow(expectedError);
      expect(Classes.update).toHaveBeenCalledWith(
        {
          subjectId: input.subjectId,
          classCode: input.classCode,
          year: input.year,
          semester: input.semester,
          password: input.password,
        },
        { where: { classId: input.classid } }
      );
      expect(Classes_Teacher.destroy).not.toHaveBeenCalled();
      expect(Classes_Teacher.create).not.toHaveBeenCalled();
      expect(Classes_Schedule.destroy).not.toHaveBeenCalled();
      expect(Classes_Schedule.create).not.toHaveBeenCalled();
    });
  });

  describe('deleteClass', () => {
    it('should update the record and resolve with the response from Classes.update', async () => {
      const classid = 123;
      const expectedResponse = [1];

      Classes.update.mockResolvedValue(expectedResponse);

      const result = await classRepository.deleteClass(classid);

      expect(result).toEqual(expectedResponse);
      expect(Classes.update).toHaveBeenCalledWith(
        { deleted: true },
        { where: { classId: classid } }
      );
    });

    it('should reject with the error from Classes.update', async () => {
      const classid = 123;
      const expectedError = new Error('Database error');

      Classes.update.mockRejectedValue(expectedError);

      await expect(classRepository.deleteClass(classid)).rejects.toThrow(expectedError);
      expect(Classes.update).toHaveBeenCalledWith(
        { deleted: true },
        { where: { classId: classid } }
      );
    });
  });
});