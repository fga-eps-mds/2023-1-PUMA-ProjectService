const PartnerController = require('../../../src/controller/PartnerController');
const partnerRepository = require('../../../src/repository/partnerRepository');

jest.mock('../../../src/repository/partnerRepository');

describe('PartnerController', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('addPartner', () => {
    it('should add a partner', async () => { 
      const partner = {
      name: 'Partner 1',
      description: 'Description 1',
      enterpriseLogo: 'Logo 1',
      projectName: 'Project 1',
      projectDescription: 'Project Description 1',
      projectImages: 'Project Images 1',
      showOnHome: false,
      };
      const partnerId = 1;
      const partnerData = {
        partnerId: 1,
        name: 'Partner 1',
        description: 'Description 1',
        enterpriseLogo: 'Logo 1',
        projectName: 'Project 1',
        projectDescription: 'Project Description 1',
        projectImages: 'Project Images 1',
        showOnHome: false,
      }
      const expectedResponse = {
        partnerId: partnerData.partnerId,
        name: partnerData.name,
        description: partnerData.description,
        enterpriseLogo: partnerData.enterpriseLogo,
        projectName: partnerData.projectName,
        projectDescription: partnerData.projectDescription,
        projectImages: partnerData.projectImages,
        showOnHome: partnerData.showOnHome,
      };

      jest.spyOn(partnerRepository, 'addPartner').mockResolvedValue(partnerData);

      const response = await PartnerController.addPartner(partner);

      expect(response).toEqual(expectedResponse);
      expect(partnerRepository.addPartner).toHaveBeenCalledWith(partner);
    });

    it('should throw an error if an error occurs in the repository', async () => {
      const partner = {
        name: 'Partner 1',
        description: 'Description 1',
        enterpriseLogo: 'Logo 1',
        projectName: 'Project 1',
        projectDescription: 'Project Description 1',
        projectImages: 'Project Images 1',
        showOnHome: false,
      };
      const error = new Error('Something went wrong');
      partnerRepository.addPartner.mockRejectedValue(error);

      await expect(PartnerController.addPartner(partner)).rejects.toThrow(error);
      expect(partnerRepository.addPartner).toHaveBeenCalledWith(partner);
    });
  });
  describe('getPartners', () => {
    it('should return all partners', async () => {
      const partners = [{ id: 1, name: 'Partner 1' }, { id: 2, name: 'Partner 2' }];
      partnerRepository.getPartners.mockResolvedValue(partners);

      const response = await PartnerController.getPartners();

      expect(response).toEqual(partners);
      expect(partnerRepository.getPartners).toHaveBeenCalledTimes(1);
    });

    it('should throw an error if an error occurs in the repository', async () => {
      const error = new Error('Something went wrong');
      partnerRepository.getPartners.mockRejectedValue(error);

      await expect(PartnerController.getPartners()).rejects.toThrow(error);
      expect(partnerRepository.getPartners).toHaveBeenCalledTimes(1);
    });
  });

  describe('deletePartner', () => {
    it('should delete a partner', async () => {
      const partnerId = 1;
      partnerRepository.deletePartner.mockResolvedValue(true);

      const response = await PartnerController.deletePartner(partnerId);

      expect(response).toBe(true);
      expect(partnerRepository.deletePartner).toHaveBeenCalledWith(partnerId);
    });

    it('should throw an error if an error occurs in the repository', async () => {
      const partnerId = 1;
      const error = new Error('Something went wrong');
      partnerRepository.deletePartner.mockRejectedValue(error);

      await expect(PartnerController.deletePartner(partnerId)).rejects.toThrow(error);
      expect(partnerRepository.deletePartner).toHaveBeenCalledWith(partnerId);
    });
  });

  describe('getPartner', () => {
    it('should return a partner by id', async () => {
      const partnerItem = { id: 1, name: 'Partner 1' };
      const input = { id: 1 };
      partnerRepository.getPartner.mockResolvedValue(partnerItem);

      const response = await PartnerController.getPartner(input);

      expect(response).toEqual(partnerItem);
      expect(partnerRepository.getPartner).toHaveBeenCalledWith(input);
    });

    it('should throw an error if an error occurs in the repository', async () => {
      const input = { id: 1 };
      const error = new Error('Something went wrong');
      partnerRepository.getPartner.mockRejectedValue(error);

      await expect(PartnerController.getPartner(input)).rejects.toThrow(error);
      expect(partnerRepository.getPartner).toHaveBeenCalledWith(input);
    });
  });

  describe('updatePartner', () => {
    it('should update a partner', async () => {
      const partnerItem = { id: 1, name: 'Partner 1' };
      const input = { partnerItem };
      partnerRepository.updatePartner.mockResolvedValue(input);

      const response = await PartnerController.updatePartner(input);

      expect(response).toEqual({ partnerItem });
      expect(partnerRepository.updatePartner).toHaveBeenCalledWith(input);
    });

    it('should throw an error if an error occurs in the repository', async () => {
      const partnerItem = { id: 1, name: 'Partner 1' };
      const input = { partnerItem };
      const error = new Error('Something went wrong');
      partnerRepository.updatePartner.mockRejectedValue(error);

      await expect(PartnerController.updatePartner(partnerItem)).rejects.toThrow(error);
      expect(partnerRepository.updatePartner).toHaveBeenCalledWith(partnerItem);
    });
  });
});