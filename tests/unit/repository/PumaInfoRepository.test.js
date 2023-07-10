const repository = require('../../../src/repository/pumaInfoRepository');
const Puma_Infos = require('../../../src/db/model/Puma_Infos');
const Topics = require('../../../src/db/model/Topics');
const Section = require('../../../src/db/model/Section');
const More_info = require('../../../src/db/model/More_Info');
const User_Properties = require('../../../src/db/model/User_Properties');
const User = require('../../../src/db/model/User');

// Mock dos modelos de banco de dados
jest.mock('../../../src/db/model/Puma_Infos');
jest.mock('../../../src/db/model/Topics');
jest.mock('../../../src/db/model/Section');
jest.mock('../../../src/db/model/More_Info');
jest.mock('../../../src/db/model/User_Properties');
jest.mock('../../../src/db/model/User');

describe('repository', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getPuma_Infos', () => {
    it('should resolve with the response object', async () => {
      // Mock das funções e valores retornados pelos modelos de banco de dados
      const pumaInfos = [{ id: 1, description: 'Info 1' }];
      const topicos = [{ id: 1, title: 'Topic 1' }];
      const moreInfos = [{ id: 1, title: 'More Info 1' }];
      const teachers = [{ id: 1, userId: 1 }];

      Puma_Infos.findAll.mockResolvedValue(pumaInfos);
      Topics.findAll.mockResolvedValue(topicos);
      More_info.findAll.mockResolvedValue(moreInfos);
      User_Properties.findAll.mockResolvedValue(teachers);
      User.findOne.mockResolvedValue({ id: 1, fullName: 'John Doe', email: 'john@example.com', phoneNumber: '123456789' });

      const response = await repository.getPuma_Infos();

      expect(response).toEqual({
        ...pumaInfos,
        topics: expect.any(Array),
        moreInfos,
        teachers: expect.any(Array),
      });
      expect(Topics.findAll).toHaveBeenCalled();
      expect(More_info.findAll).toHaveBeenCalled();
      expect(User_Properties.findAll).toHaveBeenCalled();
      expect(User.findOne).toHaveBeenCalledWith({ where: { userId: 1 } });
    });

    it('should reject with an error if any of the database operations fail', async () => {
      const error = new Error('Database error');
      Puma_Infos.findAll.mockRejectedValue(error);

      await expect(repository.getPuma_Infos()).rejects.toThrow(error);
    });
  });

  describe('updatePuma_Info', () => {
    it('should update the Puma_Info and related data', async () => {
      const input = {
        pumaItem: { infoId: 1, description: 'Updated description' },
        topics: [
          { topic: { topicId: 1, title: 'Updated topic', description: 'Updated description' }, sections: [] },
        ],
        moreInfos: [],
        teachers: [],
      };

      Puma_Infos.update.mockResolvedValue();
      Topics.create.mockResolvedValue();
      Topics.update.mockResolvedValue();
      Section.create.mockResolvedValue();
      Section.update.mockResolvedValue();
      More_info.create.mockResolvedValue();
      More_info.update.mockResolvedValue();
      User_Properties.update.mockResolvedValue();

      const response = await repository.updatePuma_Info(input);

      expect(response).toBeUndefined();
      expect(Puma_Infos.update).toHaveBeenCalledWith(
        {
          titleDescription: undefined,
          description: input.pumaItem.description,
          titleGoal: undefined,
          goal: undefined,
          titleMethodology: undefined,
          methodology: undefined,
          titleTeachers: undefined,
          descriptionImage: undefined,
          methodologyImage: undefined,
          goalImage: undefined,
        },
        { where: { infoId: input.pumaItem.infoId } }
      );
      expect(Topics.create).not.toHaveBeenCalled();
      expect(Topics.update).toHaveBeenCalledWith(
        { title: input.topics[0].topic.title, description: input.topics[0].topic.description },
        { where: { topicId: input.topics[0].topic.topicId } }
      );
      expect(Section.create).not.toHaveBeenCalled();
      expect(Section.update).not.toHaveBeenCalled();
      expect(More_info.create).not.toHaveBeenCalled();
      expect(More_info.update).not.toHaveBeenCalled();
      expect(User_Properties.update).not.toHaveBeenCalled();
    });

    it('should handle errors during the update process', async () => {
      const input = {
        pumaItem: { infoId: 1, description: 'Updated description' },
        topics: [{ topic: { topicId: 1, title: 'Updated topic', description: 'Updated description' }, sections: [] }],
        moreInfos: [],
        teachers: [],
      };

      const error = new Error('Database error');
      Puma_Infos.update.mockRejectedValue(error);

      await expect(repository.updatePuma_Info(input)).rejects.toThrow(error);
    });
  });
});