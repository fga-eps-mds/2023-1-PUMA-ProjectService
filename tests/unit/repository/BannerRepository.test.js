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
        bannerPdf: 'test-pdf.pdf',
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
        bannerPdf: 'test-pdf.pdf',
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

  describe('updateBanner', () => {
    it('should update the banner with the specified ID', async () => {
      const input = {
        bannerId: 1,
        title: 'Updated Banner',
        description: 'Updated Description',
        isEmphasis: true,
        bannerImage: 'Updated Image',
        bannerPdf: 'Updated PDF',
      };
      const mockResponse = [1];
      jest.spyOn(Banner, 'update').mockResolvedValueOnce(mockResponse);

      const response = await bannerRepository.updateBanner(input);

      expect(response).toEqual(mockResponse);
      expect(Banner.update).toHaveBeenCalledWith(
        {
          title: input.title,
          description: input.description,
          isEmphasis: input.isEmphasis,
          bannerImage: input.bannerImage,
          bannerPdf: input.bannerPdf,
        },
        {
          where: {
            bannerId: input.bannerId,
          },
        }
      );
    });

    it('should reject with an error if updating the banner fails', async () => {
      const input = {
        bannerId: 1,
        title: 'Updated Banner',
        description: 'Updated Description',
        isEmphasis: true,
        bannerImage: 'Updated Image',
        bannerPdf: 'Updated PDF',
      };
      const errorMessage = 'Failed to update the banner';
      jest.spyOn(Banner, 'update').mockRejectedValueOnce(new Error(errorMessage));

      await expect(bannerRepository.updateBanner(input)).rejects.toThrow(errorMessage);
      expect(Banner.update).toHaveBeenCalledWith(
        {
          title: input.title,
          description: input.description,
          isEmphasis: input.isEmphasis,
          bannerImage: input.bannerImage,
          bannerPdf: input.bannerPdf,
        },
        {
          where: {
            bannerId: input.bannerId,
          },
        }
      );
    });
  });

  describe('deleteBanner', () => {
    it('should mark the banner as deleted', async () => {
      const bannerId = 1;
      const mockResponse = [1];
      jest.spyOn(Banner, 'update').mockResolvedValueOnce(mockResponse);

      const response = await bannerRepository.deleteBanner(bannerId);

      expect(response).toEqual(mockResponse);
      expect(Banner.update).toHaveBeenCalledWith(
        { deleted: true },
        {
          where: {
            bannerId: bannerId,
          },
        }
      );
    });

    it('should reject with an error if marking the banner as deleted fails', async () => {
      const bannerId = 1;
      const errorMessage = 'Failed to mark the banner as deleted';
      jest.spyOn(Banner, 'update').mockRejectedValueOnce(new Error(errorMessage));

      await expect(bannerRepository.deleteBanner(bannerId)).rejects.toThrow(errorMessage);
      expect(Banner.update).toHaveBeenCalledWith(
        { deleted: true },
        {
          where: {
            bannerId: bannerId,
          },
        }
      );
    });
  });
});