const professorRepository = require('../../../src/repository/professorRepository');
const Lectures = require('../../../src/db/model/Lectures');
const Common_User = require('../../../src/db/model/Common_User');
const Teacher = require('../../../src/db/model/Teacher');
const Subject = require('../../../src/db/model/Subject');
const sequelize = require('../../../src/db/AppDb');

jest.mock('../../../src/db/AppDb', () => ({
  query: jest.fn(),
}));

jest.mock('../../../src/db/model/Lectures', () => {
  return {
    create: jest.fn(),
  };
});

jest.mock('../../../src/db/model/Common_User', () => {
  return {
    create: jest.fn(),
  };
});

jest.mock('../../../src/db/model/Teacher', () => {
  return {
    create: jest.fn(),
  };
});

jest.mock('../../../src/db/model/Subject', () => {
  return {
    create: jest.fn(),
  };
});

describe('professorRepository', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('addProfessorSubjectRelation', () => {
    it('should add a professor subject relation to the database', async () => {
      const input = { regnumber: 123, subjectid: 456 };
      const response = { regNumber: 123, subjectId: 456 };
      const expectedResult = response;
      Lectures.create.mockResolvedValue(response);
      const result = await professorRepository.addProfessorSubjectRelation(input);
      expect(result).toEqual(expectedResult);
    });

    it('should throw an error when the Lectures.create function throws an error', async () => {
      const input = { regnumber: 123, subjectid: 456 };
      const error = new Error('Database error');
      Lectures.create.mockRejectedValue(error);
      await expect(professorRepository.addProfessorSubjectRelation(input)).rejects.toThrow(error);
    });
  });

  describe('getProfessors', () => {
    it('should get a list of professors', () => {
      const resultado = [
        {
          regNumber: "6843154",
          userd: 3,
          fullName: "Professor 03",
          email: "user03@email.com",
          image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAIAQMAAAD+wSzIAAAABlBMVEX///+/v7+jQ3Y5AAAADklEQVQI12P4AIX8EAgALgAD/aNpbtEAAAAASUVORK5CYII",
        },
        {
          regNumber: "4354681",
          userd: 4,
          fullName: "Professor 04",
          email: "user04@email.com",
          image: null,
        }
      ];
      sequelize.query.mockResolvedValue([resultado]);

      return professorRepository.getProfessors()
        .then((results) => {
          expect(sequelize.query).toHaveBeenCalledWith(
            'Select pf."regNumber", pf."userId", us."fullName", us.email, us."image" from "Teacher" pf left join "Common_User" us on pf."userId" = us."userId";',
          );

          expect(results).toEqual(resultado);
        });
    });
  });

  describe('getProfessorsofSubject', () => {
    it('should get a list of professors for a given subject', () => {
      const resultado = [
        {
          regNumber: "6843154",
          userd: 3,
          fullName: "Professor 03",
          email: "user03@email.com",
          image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAIAQMAAAD+wSzIAAAABlBMVEX///+/v7+jQ3Y5AAAADklEQVQI12P4AIX8EAgALgAD/aNpbtEAAAAASUVORK5CYII",
        },
        {
          regNumber: "4354681",
          userd: 4,
          fullName: "Professor 04",
          email: "user04@email.com",
          image: null,
        }
      ];

      const input = {
        subjectid: 789,
      };

      sequelize.query.mockResolvedValue(resultado);

      return professorRepository.getProfessorsofSubject(input)
        .then((results) => {
          expect(sequelize.query).toHaveBeenCalledWith(
            `select pf."regNumber", pf."userId", us."fullName", us.email, us."image" from "Subject" sb \
      inner join "Lectures" lt on sb."subjectId" = lt."subjectId" \
      inner join "Teacher" pf on lt."regNumber" = pf."regNumber" \
      left join "Common_User" us on pf."userId" = us."userId" \
      where sb."subjectId" = ${input.subjectid}`
          );

          expect(results).toEqual(resultado);
        });
    });
  });

  describe('removeProfessorsofSubject', () => {
    it('should remove professors from a subject', () => {
      const input = {
        subjectId: 123,
      };

      sequelize.query.mockResolvedValue(null);

      return professorRepository.removeProfessorsofSubject(input)
        .then((results) => {
          expect(sequelize.query).toHaveBeenCalledWith(
            `delete from "Lectures" lt \
      where lt."subjectId" in \
      ( \
        select sb."subjectId" \
        from "Subject" sb \
        inner join "Lectures" lt \
        on sb."subjectId" = lt."subjectId" \
        where sb."subjectId" = ${input.subjectId} \
      )`
          );

          expect(results).toEqual(null);
        });
    });
  });
});
