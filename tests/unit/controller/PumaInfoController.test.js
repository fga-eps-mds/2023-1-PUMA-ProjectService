const pumaInfoRepository = require('../../../src/repository/pumaInfoRepository');
const controller = require('../../../src/controller/PumaInfoController');

jest.mock('../../../src/repository/pumaInfoRepository');

describe('PumaInfoController', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should get Puma Infos', async () => {
    const mockResponse = [{ id: 1, name: 'Puma 1' }];
    pumaInfoRepository.getPuma_Infos.mockResolvedValue(mockResponse);

    const response = await controller.getPuma_Infos();

    expect(pumaInfoRepository.getPuma_Infos).toHaveBeenCalled();
    expect(response).toEqual(mockResponse);
  });

  it('should update Puma Info', async () => {
    const input = { id: 1, name: 'Updated Puma' };
    const mockResponse = { id: 1, name: 'Updated Puma' };
    pumaInfoRepository.updatePuma_Info.mockResolvedValue(mockResponse);

    const response = await controller.updatePuma_Info(input);

    expect(pumaInfoRepository.updatePuma_Info).toHaveBeenCalledWith(input);
    expect(response).toEqual({ pumaInfo: mockResponse });
  });

  it('should handle errors in getPuma_Infos', async () => {
    const errorMessage = 'Error retrieving Puma Infos';
    pumaInfoRepository.getPuma_Infos.mockRejectedValue(new Error(errorMessage));

    await expect(controller.getPuma_Infos()).rejects.toThrow(errorMessage);
  });

  it('should handle errors in updatePuma_Info', async () => {
    const input = { id: 1, name: 'Updated Puma' };
    const errorMessage = 'Error updating Puma Info';
    pumaInfoRepository.updatePuma_Info.mockRejectedValue(new Error(errorMessage));

    await expect(controller.updatePuma_Info(input)).rejects.toThrow(errorMessage);
  });
});