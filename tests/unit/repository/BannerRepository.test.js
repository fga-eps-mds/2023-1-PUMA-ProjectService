const sequelize = require('../../../src/db/AppDb');
const Banner = require('../../../src/db/model/Banner');

const bannerRepository = require('../../../src/repository/bannerRepository');

jest.mock('../../../src/db/model/Banner', () => {
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

  describe('addBanner', () => {
    it('should add a new banner', async () => {
      const banner = {
        title: 'Test Banner',
        description: 'Test Description',
        isEmphasis: true,
        bannerImage: 'test-image.jpg',
        bannerLink: 'test link',
        buttonLabel: 'test button'
      };
      const createdBanner = {
        id: 123,
        ...banner,
      };
      jest.spyOn(Banner, 'create').mockResolvedValueOnce(createdBanner);

      const response = await bannerRepository.addBanner(banner);

      expect(response).toEqual(createdBanner);
      expect(Banner.create).toHaveBeenCalledWith(banner);
    });

    it('should reject with an error if banner creation fails', async () => {
      const banner = {
        title: 'Test Banner',
        description: 'Test Description',
        isEmphasis: true,
        bannerImage: 'test-image.jpg',
        bannerLink: 'test link',
        buttonLabel: 'test button'
      };
      const errorMessage = 'Failed to create banner';
      jest.spyOn(Banner, 'create').mockRejectedValueOnce(new Error(errorMessage));

      await expect(bannerRepository.addBanner(banner)).rejects.toThrow(errorMessage);
      expect(Banner.create).toHaveBeenCalledWith(banner);
    });
  });

  describe('getAllBanners', () => {
    it('should return all banners', async () => {
      const mockBanners = [
        { id: 1, title: 'Banner 1', description: 'Description 1' },
        { id: 2, title: 'Banner 2', description: 'Description 2' },
      ];
      jest.spyOn(Banner, 'findAll').mockResolvedValueOnce(mockBanners);

      const response = await bannerRepository.getAllBanners();

      expect(response).toEqual(mockBanners);
      expect(Banner.findAll).toHaveBeenCalled();
    });

    it('should reject with an error if fetching banners fails', async () => {
      const errorMessage = 'Failed to fetch banners';
      jest.spyOn(Banner, 'findAll').mockRejectedValueOnce(new Error(errorMessage));

      await expect(bannerRepository.getAllBanners()).rejects.toThrow(errorMessage);
      expect(Banner.findAll).toHaveBeenCalled();
    });
  });

  describe('getBanner', () => {
    it('should return the banner with the specified ID', async () => {
      const bannerId = 1;
      const mockBanner = { id: bannerId, title: 'Banner 1', description: 'Description 1' };
      jest.spyOn(Banner, 'findOne').mockResolvedValueOnce(mockBanner);

      const response = await bannerRepository.getBanner(bannerId);

      expect(response).toEqual(mockBanner);
      expect(Banner.findOne).toHaveBeenCalledWith({ where: { bannerId } });
    });

    it('should reject with an error if fetching the banner fails', async () => {
      const bannerId = 1;
      const errorMessage = 'Failed to fetch the banner';
      jest.spyOn(Banner, 'findOne').mockRejectedValueOnce(new Error(errorMessage));

      await expect(bannerRepository.getBanner(bannerId)).rejects.toThrow(errorMessage);
      expect(Banner.findOne).toHaveBeenCalledWith({ where: { bannerId } });
    });
  });

  describe('deleteBanner', () => {
    it('should delete the banner with the specified ID', async () => {
      const bannerId = 1;
      const mockResponse = 1;
      jest.spyOn(Banner, 'destroy').mockResolvedValueOnce(mockResponse);

      const response = await bannerRepository.deleteBanner(bannerId);

      expect(response).toEqual(mockResponse);
      expect(Banner.destroy).toHaveBeenCalledWith({
        where: {
          bannerId: bannerId,
        },
      });
    });

    it('should reject with an error if deleting the banner fails', async () => {
      const bannerId = 1;
      const errorMessage = 'Failed to delete the banner';
      jest.spyOn(Banner, 'destroy').mockRejectedValueOnce(new Error(errorMessage));

      await expect(bannerRepository.deleteBanner(bannerId)).rejects.toThrow(errorMessage);
      expect(Banner.destroy).toHaveBeenCalledWith({
        where: {
          bannerId: bannerId,
        },
      });
    });
  });


  describe('getHighlightBanner', () => {
    it('should return the highlighted banner', async () => {
      const mockBanner = { id: 1, title: 'Highlighted Banner', description: 'Highlighted Description' };
      jest.spyOn(Banner, 'findOne').mockResolvedValueOnce(mockBanner);

      const response = await bannerRepository.getHighlightBanner();

      expect(response).toEqual(mockBanner);
      expect(Banner.findOne).toHaveBeenCalledWith({
        where: {
          isEmphasis: true,
        },
      });
    });

    it('should reject with an error if fetching the highlighted banner fails', async () => {
      const errorMessage = 'Failed to fetch the highlighted banner';
      jest.spyOn(Banner, 'findOne').mockRejectedValueOnce(new Error(errorMessage));

      await expect(bannerRepository.getHighlightBanner()).rejects.toThrow(errorMessage);
      expect(Banner.findOne).toHaveBeenCalledWith({
        where: {
          isEmphasis: true,
        },
      });
    });
  });
});