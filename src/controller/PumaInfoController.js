/* eslint-disable*/
const pumaInfoRepository = require('../repository/pumaInfoRepository');

module.exports = {
    getPuma_Infos: () => new Promise(async (resolve, reject) => {
        try {
            const response = await pumaInfoRepository.getPuma_Infos();

            resolve(response);
        } catch (e) {
            console.log(e);
            reject(e);
        }
    }),


    updatePuma_Info: (input) => new Promise(async (resolve, reject) => {
        try {
            const {
                pumaItem
            } = input;
            const pumaInfoResponse = await pumaInfoRepository.updatePuma_Info(pumaItem);

            resolve({
                pumaItem: pumaInfoResponse,
            });
        } catch (e) {
            reject(e);
        }
    }),
};