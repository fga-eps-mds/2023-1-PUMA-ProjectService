const Semester = require('../../../src/db/model/Semester');
const semesterRepository = require('../../../src/repository/semesterRepository'); // Substitua pelo caminho correto para o seu repositório

describe('Repository', () => {
  describe('getSemester', () => {
    it('should resolve with the response when Semester.findAll succeeds', () => {
      const semesterId = 123; 
      const expectedResponse = [{ id: 1, semesterId: 123, subjectId: 123, year: 2021, semester: '2', status: 'AD', deleted: false }]; 
      
      Semester.findAll = jest.fn().mockResolvedValue(expectedResponse);
      
      return semesterRepository.getSemester(semesterId)
        .then((response) => {
          expect(Semester.findAll).toHaveBeenCalledWith({
            where: { semesterId },
          });
          expect(response).toEqual(expectedResponse);
        });
    });

    it('should reject with the error when Semester.findAll fails', () => {
      const semesterId = 123;
      const expectedError = new Error('Database error');

      Semester.findAll = jest.fn().mockRejectedValue(expectedError);
      
      return semesterRepository.getSemester(semesterId)
        .catch((error) => {
          expect(Semester.findAll).toHaveBeenCalledWith({
            where: { semesterId },
          });
          expect(error).toEqual(expectedError);
        });
    });
  });
});