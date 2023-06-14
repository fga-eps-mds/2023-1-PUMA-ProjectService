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

  getAllBanners: () => new Promise(async (resolve, reject) => {
    try {
        const response = await bannerRepository.getAllBanners();
        resolve(response);
    } catch (e) {
        console.log(e);
        reject(e);
    }
  }),
};