const bannerRepository = require("../repository/bannerRepository");

module.exports = {
    addBanner: (banner) => {
        return new Promise((resolve, reject) => {
            console.log(banner);
            try {
                resolve(bannerRepository.addBanner(banner));
            } catch (e) {
                console.log(e);
                reject(e);
            }
            resolve();
        });
    },

    getAllBanners: () =>
        new Promise(async (resolve, reject) => {
            try {
                const response = await bannerRepository.getAllBanners();
                resolve(response);
            } catch (e) {
                console.log(e);
                reject(e);
            }
        }),

    deleteBanner: (bannerId) =>
        new Promise(async (resolve, reject) => {
            try {
                const response = await bannerRepository.deleteBanner(bannerId);
                resolve(response);
            } catch (e) {
                console.log(e);
                reject(e);
            }
        }),

    getBanner: (bannerId) =>
        new Promise(async (resolve, reject) => {
            try {
                const bannerItem = await bannerRepository.getBanner(bannerId);

                resolve({
                    bannerItem,
                });
            } catch (e) {
                console.log(e);
                reject(e);
            }
        }),

    updateBanner: (bannerId) =>
        new Promise(async (resolve, reject) => {
            try {
                const bannerResponse = await bannerRepository.updateBanner(bannerId);
                resolve({
                    bannerItem: bannerResponse,
                });
            } catch (e) {
                reject(e);
            }
        }),

};
