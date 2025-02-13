const bannerRepository = require("../repository/bannerRepository");

module.exports = {
    getHighlightBanner: () => {
        return new Promise((resolve, reject) => {
            bannerRepository.getHighlightBanner()
                .then((response) => {
                    resolve(response);
                })
                .catch((e) => {
                    console.log(e);
                    reject(e);
                });
        });
    },


    addBanner: (banner) => {
        return new Promise((resolve, reject) => {
            try {
                resolve(bannerRepository.addBanner(banner));
            } catch (e) {
                reject(e);
            }
            resolve();
        });
    },

    getAllBanners: () =>
        new Promise((resolve, reject) => {
            bannerRepository.getAllBanners()
                .then((response) => {
                    resolve(response);
                })
                .catch((e) => {
                    console.log(e);
                    reject(e);
                });
        }),

    deleteBanner: (bannerId) =>
        new Promise((resolve, reject) => {
            bannerRepository.deleteBanner(bannerId)
                .then((response) => {
                    resolve(response);
                })
                .catch((e) => {
                    console.log(e);
                    reject(e);
                });
        }),

    getBanner: (bannerId) =>
        new Promise((resolve, reject) => {
            bannerRepository.getBanner(bannerId)
                .then((bannerItem) => {
                    resolve({
                        bannerItem,
                    });
                })
                .catch((e) => {
                    console.log(e);
                    reject(e);
                });
        }),


    updateBanner: (bannerId) =>
        new Promise((resolve, reject) => {
            bannerRepository.updateBanner(bannerId)
                .then((bannerResponse) => {
                    resolve({
                        bannerItem: bannerResponse,
                    });
                })
                .catch((e) => {
                    reject(e);
                });
        }),
};
