const sequelize = require('../../../src/db/AppDb');
const Partners = require('../../../src/db/model/Partners');


const repository = require('../../../src/repository/partnerRepository');

jest.mock('../../../src/db/AppDb', () => ({
  query: jest.fn(),
}));

jest.mock('../../../src/db/model/Partners', () => {
  return {
    create: jest.fn(),
    findAll: jest.fn(),
    destroy: jest.fn(),
    update: jest.fn(),
    findOne: jest.fn(),
  };
});

describe('Repository', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getPartners', () => {
    it('should resolve with the response from Patners.findAll', async () => {
      const expectedResult = ['partner1', 'partner2'];
      Partners.findAll.mockResolvedValue(expectedResult);

      const result = await repository.getPartners();

      expect(result).toEqual(expectedResult);
      expect(Partners.findAll).toHaveBeenCalled();
    });

    it('should reject with the error from Partners.findAll', async () => {
      const expectedError = new Error('Database error');
      Partners.findAll.mockRejectedValue(expectedError);

      await expect(repository.getPartners()).rejects.toThrow(expectedError);
      expect(Partners.findAll).toHaveBeenCalled();
    });
  });

describe('getPartner', () => {
    it('should resolve with response from Partners.findOne', async () => {
      const partnerId = 1;
      const expectedResult = { id: partnerId, name: 'Project 1' };
  
      Partners.findOne.mockResolvedValue(expectedResult);
  
      const result = await repository.getPartner({ partnerId }); // Pass partnerId as an object property
  
      expect(result).toBe(expectedResult);
      expect(Partners.findOne).toHaveBeenCalledWith({ where: { partnerId: partnerId } });
    });
  
    it('should reject with error when Partners.findOne throws an error', async () => {
      const partnerId = 1;
      const expectedError = new Error('Database error');
  
      Partners.findOne.mockRejectedValue(expectedError);
  
      await expect(repository.getPartner({ partnerId })).rejects.toThrow(expectedError); // Pass partnerId as an object property
    });
  });

  describe('addPartner', () => {
    it('should resolve with created project when Partners.create is successful', async () => {
      const partner = {
        name: 'CODE',
        description: '2023',
        enterpriseLogo: '1',
        projectName: 'Project',
        projectDescription: '123',
        projectImages: '',
        showOnHome: false, // Add showOnHome property with the desired value
      };
      const expectedResult = { id: 1, ...partner };
  
      Partners.create.mockResolvedValue(expectedResult);
  
      const result = await repository.addPartner(partner);
  
      expect(result).toBe(expectedResult);
      expect(Partners.create).toHaveBeenCalledWith(partner);
    });
  
    it('should reject with an error when Partners.create throws an error', async () => {
      const partner = {
        name: 'CODE',
        description: '2023',
        enterpriseLogo: '1',
        projectName: 'Project',
        projectDescription: '123',
        projectImages: '',
        showOnHome: false, // Add showOnHome property with the desired value
      };
      const expectedError = new Error('Database error');
  
      Partners.create.mockRejectedValue(expectedError);
  
      await expect(repository.addPartner(partner)).rejects.toThrow(expectedError);
      expect(Partners.create).toHaveBeenCalledWith(partner);
    });
  });

  describe('updatePartner', () => {
    it('should resolve with updated project when Partners.update is successful', async () => {
      const partnerId = 1;
      const partner = {
        name: 'Updated Project',
        description: 'Updated Expected Result',
        enterpriseLogo: 'Updated Feedback',
        projectName: 'Updated Problem',
        projectDescription: 'completed',
        projectImages: '',
        showOnHome: false
      };
      const expectedResult = { id: partnerId, ...partner };

      Partners.update.mockResolvedValue([1, [expectedResult]]);
      Partners.findOne.mockResolvedValue(expectedResult);

      const result = await repository.updatePartner(partnerId, partner);

      expect(result).toBe(expectedResult);
    });

    it('should reject with an error when Project.update throws an error', async () => {
    const partner = {
        name: 'Updated Project',
        description: 'Updated Expected Result',
        enterpriseLogo: 'Updated Feedback',
        projectName: 'Updated Problem',
        projectDescription: 'completed',
        projectImages: ''
    };
      const expectedError = new Error('Database error');

      Partners.update.mockRejectedValue(expectedError);

      await expect(repository.updatePartner(partner)).rejects.toThrow(expectedError);
    });
  });

  describe('deletePartner', () => {
    it('should reject with an error when Project.destroy throws an error', async () => {
      const partnerid = 1;
      const expectedError = new Error('Database error');

      Partners.destroy.mockRejectedValue(expectedError);

      await expect(repository.deletePartner(partnerid)).rejects.toThrow(expectedError);
    });
  });
});