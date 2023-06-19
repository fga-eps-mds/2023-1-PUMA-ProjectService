const sequelize = require('../../../src/db/AppDb');
const Subject = require('../../../src/db/model/Subject');
const subjectRepository = require('../../../src/repository/subjectRepository');

describe('Repository', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('addSubject', () => {
    it('should create a new subject', async () => {
      const input = {
        name: 'Subject 1',
        courseSyllabus: 'Syllabus 1',
        courseDescription: 'Description 1',
      };

      jest.spyOn(Subject, 'create').mockResolvedValue(input);

      const response = await subjectRepository.addSubject(input);

      expect(Subject.create).toHaveBeenCalledWith(input);
      expect(response).toEqual(input);
    });

    it('should reject with an error if subject creation fails', async () => {
      const input = {
        name: 'Subject 1',
        courseSyllabus: 'Syllabus 1',
        courseDescription: 'Description 1',
      };

      const error = new Error('Subject creation failed');
      jest.spyOn(Subject, 'create').mockRejectedValue(error);

      await expect(subjectRepository.addSubject(input)).rejects.toThrow(error);
      expect(Subject.create).toHaveBeenCalledWith(input);
    });
  });

  describe('getSubjects', () => {
    it('should retrieve all subjects', async () => {
      const subjects = [
        { id: 1, name: 'Subject 1', courseSyllabus: 'Syllabus 1', courseDescription: 'Description 1' },
        { id: 2, name: 'Subject 2', courseSyllabus: 'Syllabus 2', courseDescription: 'Description 2' },
      ];

      jest.spyOn(Subject, 'findAll').mockResolvedValue(subjects);

      const response = await subjectRepository.getSubjects();

      expect(Subject.findAll).toHaveBeenCalledWith({
        where: {
          deleted: false,
        },
        order: [['subjectId', 'DESC']],
      });
      expect(response).toEqual(subjects);
    });

    it('should reject with an error if subject retrieval fails', async () => {
      const error = new Error('Subject retrieval failed');
      jest.spyOn(Subject, 'findAll').mockRejectedValue(error);

      await expect(subjectRepository.getSubjects()).rejects.toThrow(error);
      expect(Subject.findAll).toHaveBeenCalledWith({
        where: {
          deleted: false,
        },
        order: [['subjectId', 'DESC']],
      });
    });
  });

  describe('getSubject', () => {
    it('should retrieve a subject by subjectId', async () => {
      const input = {
        subjectid: 1,
      };
      const subject = {
        id: 1,
        name: 'Subject 1',
        courseSyllabus: 'Syllabus 1',
      };

      jest.spyOn(Subject, 'findOne').mockResolvedValue(subject);

      const response = await subjectRepository.getSubject(input);

      expect(Subject.findOne).toHaveBeenCalledWith({
        where: {
          subjectId: input.subjectid,
        },
      });
      expect(response).toEqual(subject);
    });

    it('should reject with an error if subject retrieval fails', async () => {
      const input = {
        subjectid: 1,
      };
      const error = new Error('Subject retrieval failed');
      jest.spyOn(Subject, 'findOne').mockRejectedValue(error);

      await expect(subjectRepository.getSubject(input)).rejects.toThrow(error);
      expect(Subject.findOne).toHaveBeenCalledWith({
        where: {
          subjectId: input.subjectid,
        },
      });
    });
  });

  describe('updateSubject', () => {
    it('should update a subject', async () => {
      const input = {
        subjectId: 1,
        name: 'Subject 1 Updated',
        courseSyllabus: 'Syllabus 1 Updated',
        courseDescription: 'Description 1 Updated',
      };
      const response = [1];

      jest.spyOn(Subject, 'update').mockResolvedValue(response);

      const result = await subjectRepository.updateSubject(input);

      expect(Subject.update).toHaveBeenCalledWith(
        {
          name: input.name,
          courseSyllabus: input.courseSyllabus,
          courseDescription: input.courseDescription,
        },
        {
          where: {
            subjectId: input.subjectId,
          },
        }
      );
      expect(result).toEqual(response);
    });

    it('should reject with an error if subject update fails', async () => {
      const input = {
        subjectId: 1,
        name: 'Subject 1 Updated',
        courseSyllabus: 'Syllabus 1 Updated',
      };
      const error = new Error('Subject update failed');
      jest.spyOn(Subject, 'update').mockRejectedValue(error);

      await expect(subjectRepository.updateSubject(input)).rejects.toThrow(error);
      expect(Subject.update).toHaveBeenCalledWith(
        {
          name: input.name,
          courseSyllabus: input.courseSyllabus,
        },
        {
          where: {
            subjectId: input.subjectId,
          },
        }
      );
    });
  });

  describe('deleteSubject', () => {
    it('should delete a subject', async () => {
      const subjectId = 1;
      const response = [1];

      jest.spyOn(Subject, 'update').mockResolvedValue(response);

      const result = await subjectRepository.deleteSubject(subjectId);

      expect(Subject.update).toHaveBeenCalledWith(
        {
          deleted: true,
        },
        {
          where: {
            subjectId,
          },
        }
      );
      expect(result).toEqual(response);
    });

    it('should reject with an error if subject deletion fails', async () => {
      const subjectId = 1;
      const error = new Error('Subject deletion failed');
      jest.spyOn(Subject, 'update').mockRejectedValue(error);

      await expect(subjectRepository.deleteSubject(subjectId)).rejects.toThrow(error);
      expect(Subject.update).toHaveBeenCalledWith(
        {
          deleted: true,
        },
        {
          where: {
            subjectId,
          },
        }
      );
    });
  });
});