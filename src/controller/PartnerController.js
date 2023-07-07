/* eslint-disable*/
const partnerRepository = require('../repository/partnerRepository');

module.exports = {
    addPartner: (partner) => {
        return new Promise((resolve, reject) => {
            console.log(partner);
          try {
            resolve(partnerRepository.addPartner(partner));
          } catch (e) {
            console.log(e);
            reject(e);
          }
          resolve();
        });
      },

    getPartners: () => new Promise(async (resolve, reject) => {
        try {
            const response = await partnerRepository.getPartners();

            resolve(response);
        } catch (e) {
            console.log(e);
            reject(e);
        }
    }),

    deletePartner: (partnerId) => new Promise(async (resolve, reject) => {
        try {
            const response = await partnerRepository.deletePartner(classId);
            resolve(response);
        } catch (e) {
            console.log(e);
            reject(e);
        }
    }),

    getPartner: (partnerId) => new Promise(async (resolve, reject) => {
        try {
            const partnerItem = await partnerRepository.getPartner(partnerId);

            resolve(partnerItem);
        } catch (e) {
            console.log(e);
            reject(e);
        }
    }),

    updatePartner: (input, partnerId) => new Promise(async (resolve, reject) => {
        try {
            const obj = {
                ...input,
                partnerId: partnerId
            }
            const partnerResponse = await partnerRepository.updatePartner(obj);

            resolve(partnerResponse);
        } catch (e) {
            console.log(e)
            reject(e);
        }
    }),
};
