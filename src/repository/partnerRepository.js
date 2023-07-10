/* eslint-disable */
const db = require('../../dbconfig/dbConfig');
const Partners = require('../db/model/Partners');

module.exports = {
  addPartner: (partner) => new Promise((resolve, reject) => {
    const { name, description, enterpriseLogo, projectName, projectDescription, projectImages, showOnHome } = partner;
    Partners.create({
      name,
      description,
      enterpriseLogo,
      projectName,
      projectDescription,
      projectImages,
      showOnHome: false,
    }).then((response) => {
      resolve(response);
    }).catch((e) => {
      console.log('Repository', e);
      reject(e);
    });
  }),

  getPartners: () => new Promise((resolve, reject) => {
    Partners.findAll().then((response) => {
      resolve(response);
    }).catch((e) => reject(e));
  }),

  getPartner: (input) => new Promise((resolve, reject) => {
    const { partnerId } = input;
    Partners.findOne({
      where: { 
        partnerId: partnerId, 
      },
    }).then((response) => {
      resolve(response);
    }).catch((e) => reject(e));
  }),

  updatePartner: (input) => new Promise((resolve, reject) => {
    const { partnerId, name, description, enterpriseLogo, projectName, projectDescription, projectImages, showOnHome } = input;
    console.log
      Partners.update({
        name,
        description,
        enterpriseLogo,
        projectName,
        projectDescription,
        projectImages,
        showOnHome,
      }, {
        where: {
          partnerId: partnerId,
        },
      }).then((response) => {
        resolve(Partners.findOne({
          where: {
            partnerId: partnerId
          }
        }));
      }).catch((e) => reject(e));
  }),

  deletePartner: (partnerId) => new Promise((resolve, reject) => {
    Partners.destroy({
      where: {
        partnerId: partnerId,
      },
    }).then((response) => {
        resolve(response);
      }).catch((response) => {
        reject(response);
      });
  }),
};
