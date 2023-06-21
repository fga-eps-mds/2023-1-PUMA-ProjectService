/* eslint-disable */
const db = require('../../dbconfig/dbConfig');
const Partners = require('../db/model/Partners');

module.exports = {
  addPartner: (partner) => new Promise((resolve, reject) => {
    const { name, cnpj, enterpriseLogo, socialReason } = partner;
    Partners.create({
      name,
      description,
      enterpriseLogo,
      projectName,
      projectDescription,
      projectImages,
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
    const { partnerId, name, cnpj, enterpriseLogo, socialReason } = input;

    if (partnerId === '0') {
      Partners.create({
        name,
        cnpj,
        enterpriseLogo,
        socialReason,
      })
    } else {
      Partners.update({
        name,
        cnpj,
        enterpriseLogo,
        socialReason,
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
