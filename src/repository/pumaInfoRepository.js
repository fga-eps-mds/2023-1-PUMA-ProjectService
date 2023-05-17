/* eslint-disable */
/* eslint-disable no-trailing-spaces */
/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
/* eslint-disable indent */
const Puma_Infos = require("../db/model/Puma_Infos");
const Topics = require("../db/model/Topics");
const Section = require("../db/model/Section");
const More_info = require("../db/model/More_Info");
const Teacher = require("../db/model/Teacher");

module.exports = {
  // Get all Puma infos
  getPuma_Infos: () =>
    new Promise(async(resolve, reject) => {
      try{

        const pumaInfos = await Puma_Infos.findAll()
        const topicos = await Topics.findAll()
        const moreInfos = await More_info.findAll()
        const idealizers = await Teacher.findAll({where:{
          isIdealizer: true
        }});

        const topicosResponse = topicos.map(async(topic) => {
          const topicosResponse = {
            topic,
            sections: await Section.findAll({where:{
              topicId: topic.topicId
            }})
          }
          return topicosResponse;
        } )
        const response = {
          ...pumaInfos,
          topics: topicosResponse,
          moreInfos,
          idealizers
        }
        resolve(response);
      } catch(e){
        reject(e);
      }
    }),

  // Update PUMA Infos
  updatePuma_Info: (input) =>
    new Promise(async (resolve, reject) => {
      const {
        description,
        goal,
        methodology,
        methodologyImage,
        goalImage,
        topics,
        moreInfos,
        sections,
        teachers
      } = input;
      const pumaInfo = await getPuma_Infos();

      Puma_Infos.update(
        {
          description,
          goal,
          methodology,
          methodologyImage,
          goalImage,
        },
        {
          where: {
            infoId: pumaInfo.infoId,
          },
        }
      )
        .then(async (response) => {
          await update_topics(topics);
          await update_sections(sections);
          await update_more_info(moreInfos);
          await update_idealizers(teachers);
        
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    }),

  update_more_info: async (moreInfos) => {
    for (const moreInfo of moreInfos) {
      if (moreInfo.moreInfoId) {
        await More_info.create({
          title: moreInfo.title,
          description: moreInfo.description,
        });
      } else {
        await More_info.update(
          {
            title: moreInfo.section.title,
            description: moreInfo.section.description,
          },
          {
            where: {
              moreInfoId: moreInfo.moreInfoId,
            },
          }
        );
      }
    }
  },

  update_sections: async (sections) => {
    for (const section of sections) {
      if (!section.sectionId) {
        await Section.create({
          title: section.title,
          description: section.description,
        });
      } else {
        await Section.update(
          {
            title: section.title,
            description: section.description,
          },
          {
            where: {
              sectionId: section.sectionId,
            },
          }
        );
      }
    }
  },

  update_topics: async (topics) => {
    for (const topic of topics) {
      if (!topic.topicId) {
        await Topics.create({
          title: topic.title,
          description: topic.description,
        });
      } else {
        await Topics.update(
          {
            title: topic.title,
            description: topic.description,
          },
          {
            where: {
              topicId: topic.topicId,
            },
          }
        );
      }
    }
  },

  update_idealizers: async (teachers) => {
    for(const teacher of teachers){
      await Teacher.update(
        {
          isIdealizer: teacher.isIdealizer
        },
        {
          where: {
            userId: teacher.userId
          }
        }
      )
    }
  },
};
