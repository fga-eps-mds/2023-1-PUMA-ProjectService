/* eslint-disable */
/* eslint-disable no-trailing-spaces */
/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
/* eslint-disable indent */
const Puma_Infos = require("../db/model/Puma_Infos");
const Topics = require("../db/model/Topics");
const Section = require("../db/model/Section");
const More_info = require("../db/model/More_Info");
const User_Properties = require("../db/model/User_Properties");
const User = require("../db/model/User");

module.exports = {
  // Get all Puma infos
  getPuma_Infos: () =>
    new Promise(async(resolve, reject) => {
      try{

        const pumaInfos = await Puma_Infos.findAll()
        const topicos = await Topics.findAll()
        const moreInfos = await More_info.findAll()
        const teachers = await User_Properties.findAll({
          where: {
            statusTeacher: 'ACEITO',
          }
        });

        const teachersResponse = []

        for(const teacher of teachers) {
          const teacherComplementaryInfos = await User.findOne({
            where: {
              userId: teacher.userId
            }
          })
          teachersResponse.push({
            ...teacher,
            fullName: teacherComplementaryInfos.fullName,
            email: teacherComplementaryInfos.email,
            phoneNumber: teacherComplementaryInfos.phoneNumber,
            image: teacherComplementaryInfos.image
          })
        }

        const topicosResponse = await Promise.all(topicos.map(async(topic) => {
          const topicosResponse = {
            topic,
            sections: await Section.findAll({where:{
              topicId: topic.topicId
            }})
          }
          return topicosResponse;
        }))
        const response = {
          ...pumaInfos,
          topics: topicosResponse,
          moreInfos,
          teachers: teachersResponse
        }
        resolve(response);
      } catch(e){
        reject(e);
      }
    }),

  // Update PUMA Infos
  updatePuma_Info: (input) =>
    new Promise(async (resolve, reject) => {
      console.log(`Input: `, input)
      const {
        pumaItem,
        topics,
        moreInfos,
        teachers,
      } = input;

      // const pumaInfo = await module.exports.getPuma_Infos();

      await Puma_Infos.update(
        {
          titleDescription: pumaItem.titleDescription,
          description: pumaItem.description,
          titleGoal: pumaItem.titleGoal,
          goal: pumaItem.goal,
          titleMethodology: pumaItem.titleMethodology,
          methodology: pumaItem.methodology,
          titleTeachers: pumaItem.titleTeachers,
          descriptionImage: pumaItem.descriptionImage,
          methodologyImage: pumaItem.methodologyImage,
          goalImage: pumaItem.goalImage,
        },
        {
          where: {
            infoId: pumaItem.infoId,
          },
        }
      )
        .then(async (response) => {
          await module.exports.update_topics(topics);
            const sectionsArray = topics.map(topic => {
              console.log(topic)
              return topic.sections
            })

          await module.exports.update_sections(sectionsArray);

          await module.exports.update_more_info(moreInfos);
          await module.exports.update_idealizers(teachers);
        
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    }),

  update_more_info: async (moreInfos) => {
    const objs = await More_info.findAll()
    var objsIds = []
    objs.forEach(e => objsIds.push(e.moreInfoId))
    const ids = moreInfos.map(item => item.moreInfoId)
    if (moreInfos) {
      for (const moreInfo of moreInfos) {
        if (!objsIds.includes(moreInfo.moreInfoId)) {
          await More_info.create({
            infoId: 1,
            title: moreInfo.title,
            description: moreInfo.description,
          });
        } else {
          try {
            await More_info.update(
              {
                infoId: moreInfo.infoId,
                title: moreInfo.title,
                description: moreInfo.description,
              },
              {
                where: {
                  moreInfoId: moreInfo.moreInfoId,
                },
              }
            );
          }
          catch(e) {
            console.log(e)
          }
        }
      }
    }
  },

  update_sections: async (sections) => {
    const ids = []
    sections.forEach(element => {
      element.forEach(item => {
        ids.push(item.sectionId)
      })
    });
    if (sections) {
      for (const section of sections) {
        for (const item of section) {
          if (!ids.includes(item.sectionId)) {
            await Section.create({
              title: item.title,
              description: item.description,
            });
          } else {
            await Section.update(
              {
                title: item.title,
                description: item.description,
              },
              {
                where: {
                  sectionId: item.sectionId,
                },
              }
            );
          }
        } 
      }
    }
  },

  update_topics: async (topics) => {
    if (topics){
      for (const topic of topics) {
        if (!topic.topic.topicId) {
          await Topics.create({
            title: topic.topic.title,
            description: topic.topic.description,
          });
        } else {
          await Topics.update(
            {
              title: topic.topic.title,
              description: topic.topic.description,
            },
            {
              where: {
                topicId: topic.topic.topicId,
              },
            }
          );
        }
      }
    }
  },

  update_idealizers: async (teachers) => {
    if (teachers) {
      for(const teacher of teachers){
        console.log(teacher);
        await User_Properties.update(
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
    }
  },
};
