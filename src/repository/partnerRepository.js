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
    Partners.findAll({
      where: { 
        partnerId: partnerId, 
      },
    })
  }),

  updatePartner: (input) => new Promise((resolve, reject) => {
    const { partnerId, name, description, enterpriseLogo, projectName, projectDescription, projectImages, showOnHome } = input;

    if (partnerId === '0') {
      Partners.create({
        name,
        description,
        enterpriseLogo,
        projectName,
        projectDescription,
        projectImages,
        showOnHome,
      })
    } else {
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
      })
    }
  }),

  deletePartner: (partnerId) => new Promise((resolve, reject) => {
    Partners.update({
      deleted: true,
    }, {
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
