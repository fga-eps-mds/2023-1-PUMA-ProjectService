/* eslint-disable */
/* eslint-disable no-trailing-spaces */
/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
/* eslint-disable indent */
const db = require('../../dbconfig/dbConfig');
const Puma_Infos = require('../db/model/Puma_Infos');
const Topics = require('../db/model/Topics');
const Section = require('../db/model/Section');
const More_info = require('../db/model/More_Info');
const Teacher = require('../db/model/Teacher');

module.exports = {
  // Get all Puma infos
  getPuma_Infos: () => new Promise((resolve, reject) => {
    Puma_Infos.findAll().then((response) => {
      resolve(response[0]);
    }).catch((e) => reject(e));
  }),



  // Update PUMA Infos
  updatePuma_Info: (input) => new Promise( async (resolve, reject) => {
    const {
  description, goal, methodology, methodologyImage, goalImage, topics, moreInfos, sections,
} = input;
      const pumaInfo = await getPuma_Infos()

      Puma_Infos.update({
        description,
        goal,
        methodology,
        methodologyImage,
        goalImage,
      }, {
        where: {
          infoId: pumaInfo.infoId,
        },
      })
        .then(async(response) => {
          for (const topic of topics){
            if (topic.topicId){
              await Topics.create({
                title: topic.title,
                description: topic.description,
              })
            } else{
              await Topics.update({
                where: {
                  topicId:topicId,
                }
              })
            }
          for (const section of sections){
            if (section.sectionId){
              await Section.create({
                title: section.title,
                description: section.description,
              })
            } else{
              await Topics.update({
                where: {
                  sectionId:sectionId,
                }
              })
            }
          }
        }
          
        then(async(response) => {
          for (const moreInfo of moreInfos){
            if (moreInfo.moreInfoId){
              await More_info.create({
                title: moreInfo.title,
                description: moreInfo.description,
              })
            } else{
              await More_info.update({
                where: {
                  moreInfoId:moreInfoId,
                }
              })
            }
          }}).catch((e) => {
            reject(e);
          });

        resolve(response);
        }).catch((response) => {
          reject(response);
        });
  
  }),

};
