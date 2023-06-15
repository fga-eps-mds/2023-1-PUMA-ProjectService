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
        bannerImage: 'Test image',
        bannerLink: 'Test link',
        buttonLabel: 'Test button'
      };
      const bannerData = {
        title: banner.title,
        description: banner.description,
        isEmphasis: banner.isEmphasis,
        bannerImage: banner.bannerImage,
        bannerLink: banner.bannerLink,
        buttonLabel: banner.buttonLabel,
        deleted: false,
      };
      const expectedResponse = {
        title: bannerData.title,
        description: bannerData.description,
        isEmphasis: bannerData.isEmphasis,
        bannerImage: bannerData.bannerImage,
        bannerLink: bannerData.bannerLink,
        buttonLabel: bannerData.buttonLabel,
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
        bannerImage: 'Test image',
        bannerLink: 'Test link',
        buttonLabel: 'Test button'
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
          bannerImage: 'banner1.png',
          bannerLink: 'banner1 link',
          buttonLabel: 'banner1 button'
        },
        {
          title: 'Banner 2',
          description: 'Description 2',
          isEmphasis: true,
          bannerImage: 'banner2.png',
          bannerLink: 'banner2 link',
          buttonLabel: 'banner2 button'
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
        bannerImage: 'Test Image',
        bannerLink: 'Test link',
        buttonLabel: 'Test button'
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
        bannerImage: 'Updated Image',
        bannerLink: 'Test link',
        buttonLabel: 'Test button'
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

  describe('getHighlightBanner', () => {
    it('should retrieve the highlight banner', async () => {
      const mockBanner = {
        title: 'Highlight Banner',
        description: 'This is the highlight banner',
        isEmphasis: true,
        bannerImage: 'highlight.png',
        bannerLink: 'highlight link',
        buttonLabel: 'highlight button'
      };
      jest.spyOn(bannerRepository, 'getHighlightBanner').mockResolvedValueOnce(mockBanner);

      const response = await bannerController.getHighlightBanner();

      expect(response).toEqual(mockBanner);
      expect(bannerRepository.getHighlightBanner).toHaveBeenCalled();
    });

    it('should reject with an error if retrieval fails', async () => {
      const errorMessage = 'Failed to retrieve highlight banner';
      jest.spyOn(bannerRepository, 'getHighlightBanner').mockRejectedValueOnce(new Error(errorMessage));

      await expect(bannerController.getHighlightBanner()).rejects.toThrow(errorMessage);
      expect(bannerRepository.getHighlightBanner).toHaveBeenCalled();
    });
  });

});
