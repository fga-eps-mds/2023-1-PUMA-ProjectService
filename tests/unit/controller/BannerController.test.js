const bannerController = require('../../../src/controller/BannerController');
const bannerRepository = require('../../../src/repository/bannerRepository');

jest.mock('../../../src/repository/bannerRepository');

describe('BannerController', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('addBanner', () => {
    it('should add a banner', async () => {
      const banner = {
        title: 'Test Project',
        description: 'Test Description',
        isEmphasis: false,
        bannerPdf: 'Test pdf',
        bannerImage: 'Test image',
      };
      const bannerData = {
        title: banner.title,
        description: banner.description,
        isEmphasis: banner.isEmphasis,
        bannerPdf: banner.bannerPdf,
        bannerImage: banner.bannerPdf,
        deleted: false,
      };
      const expectedResponse = {
        title: bannerData.title,
        description: bannerData.description,
        isEmphasis: bannerData.isEmphasis,
        bannerPdf: bannerData.bannerPdf,
        bannerImage: bannerData.bannerPdf,
        deleted: bannerData.deleted,
      };
      jest.spyOn(bannerRepository, 'addBanner').mockResolvedValueOnce(bannerData);

      const response = await bannerController.addBanner(banner);

      expect(response).toEqual(expectedResponse);
      expect(bannerRepository.addBanner).toHaveBeenCalledWith(banner);
    });

    it('should reject with error when addBanner throws an error', async () => {
      const banner = {
        title: 'Test Project',
        description: 'Test Description',
        isEmphasis: false,
        bannerPdf: 'Test pdf',
        bannerImage: 'Test image',
      };
      const error = new Error('Unable to add banner');
      jest.spyOn(bannerRepository, 'addBanner').mockRejectedValueOnce(error);

      await expect(bannerController.addBanner(banner)).rejects.toEqual(error);
      expect(bannerRepository.addBanner).toHaveBeenCalledWith({ ...banner });
    });
  });

  describe('getAllBanners', () => {
    it('should retrieve all banners', async () => {
      const mockBanners = [
        {
          title: 'Banner 1',
          description: 'Description 1',
          isEmphasis: false,
          bannerPdf: 'banner1.pdf',
          bannerImage: 'banner1.png',
        },
        {
          title: 'Banner 2',
          description: 'Description 2',
          isEmphasis: true,
          bannerPdf: 'banner2.pdf',
          bannerImage: 'banner2.png',
        },
      ];
      jest.spyOn(bannerRepository, 'getAllBanners').mockResolvedValueOnce(mockBanners);

      const response = await bannerController.getAllBanners();

      expect(response).toEqual(mockBanners);
      expect(bannerRepository.getAllBanners).toHaveBeenCalled();
    });

    it('should reject with an error if retrieval fails', async () => {
      const errorMessage = 'Failed to retrieve banners';
      jest.spyOn(bannerRepository, 'getAllBanners').mockRejectedValueOnce(new Error(errorMessage));

      await expect(bannerController.getAllBanners()).rejects.toThrow(errorMessage);
      expect(bannerRepository.getAllBanners).toHaveBeenCalled();
    });
  });

  describe('deleteBanner', () => {
    it('should delete a banner', async () => {
      const bannerId = 123;
      jest.spyOn(bannerRepository, 'deleteBanner').mockResolvedValueOnce(true);

      const response = await bannerController.deleteBanner(bannerId);

      expect(response).toBe(true);
      expect(bannerRepository.deleteBanner).toHaveBeenCalledWith(bannerId);
    });

    it('should reject with an error if deletion fails', async () => {
      const bannerId = 123;
      const errorMessage = 'Failed to delete banner';
      jest.spyOn(bannerRepository, 'deleteBanner').mockRejectedValueOnce(new Error(errorMessage));

      await expect(bannerController.deleteBanner(bannerId)).rejects.toThrow(errorMessage);
      expect(bannerRepository.deleteBanner).toHaveBeenCalledWith(bannerId);
    });
  });

  describe('getBanner', () => {
    it('should return the banner item', async () => {
      const bannerId = 123;
      const bannerItem = {
        id: bannerId,
        title: 'Test Banner',
        description: 'Test Description',
        isEmphasis: true,
        bannerPdf: 'Test PDF',
        bannerImage: 'Test Image',
      };
      jest.spyOn(bannerRepository, 'getBanner').mockResolvedValueOnce(bannerItem);

      const response = await bannerController.getBanner(bannerId);

      expect(response).toEqual({ bannerItem });
      expect(bannerRepository.getBanner).toHaveBeenCalledWith(bannerId);
    });

    it('should reject with an error if banner retrieval fails', async () => {
      const bannerId = 123;
      const errorMessage = 'Failed to retrieve banner';
      jest.spyOn(bannerRepository, 'getBanner').mockRejectedValueOnce(new Error(errorMessage));

      await expect(bannerController.getBanner(bannerId)).rejects.toThrow(errorMessage);
      expect(bannerRepository.getBanner).toHaveBeenCalledWith(bannerId);
    });
  });

  describe('updateBanner', () => {
    it('should return the updated banner item', async () => {
      const bannerId = 123;
      const updatedBannerItem = {
        id: bannerId,
        title: 'Updated Banner',
        description: 'Updated Description',
        isEmphasis: true,
        bannerPdf: 'Updated PDF',
        bannerImage: 'Updated Image',
      };
      jest.spyOn(bannerRepository, 'updateBanner').mockResolvedValueOnce(updatedBannerItem);

      const response = await bannerController.updateBanner(bannerId);

      expect(response).toEqual({ bannerItem: updatedBannerItem });
      expect(bannerRepository.updateBanner).toHaveBeenCalledWith(bannerId);
    });

    it('should reject with an error if banner update fails', async () => {
      const bannerId = 123;
      const errorMessage = 'Failed to update banner';
      jest.spyOn(bannerRepository, 'updateBanner').mockRejectedValueOnce(new Error(errorMessage));

      await expect(bannerController.updateBanner(bannerId)).rejects.toThrow(errorMessage);
      expect(bannerRepository.updateBanner).toHaveBeenCalledWith(bannerId);
    });
  });

});
