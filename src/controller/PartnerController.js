/* eslint-disable*/
const partnerRepository = require('../repository/partnerRepository');

module.exports = {
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

            resolve({
                partnerItem
            });
        } catch (e) {
            console.log(e);
            reject(e);
        }
    }),

    updatePartner: (partnerId) => new Promise(async (resolve, reject) => {
        try {
            const {
                partnerItem
            } = partnerId;
            const partnerResponse = await partnerRepository.updatePartner(partnerItem);

            resolve({
                partnerItem: partnerResponse,
            });
        } catch (e) {
            reject(e);
        }
    }),
};
