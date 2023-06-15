/* eslint-disable */
const db = require("../../dbconfig/dbConfig");
const Banner = require("../db/model/Banner");

module.exports = {
  addBanner: (banner) =>
    new Promise((resolve, reject) => {
      const { title, description, isEmphasis, bannerImage, bannerLink, buttonLabel } =
        banner;
      if (isEmphasis) {
        Banner.update({
          isEmphasis: false,
        }, {
          where: {
            isEmphasis: true,
          }
        });
      }
      Banner.create({
        title,
        description,
        isEmphasis,
        bannerImage,
        bannerLink,
        buttonLabel,
      })
        .then((response) => {
          resolve(response);
        })
        .catch((e) => {
          console.log("Repository", e);
          reject(e);
        });
    }),

  getAllBanners: () =>
    new Promise((resolve, reject) => {
      Banner.findAll()
        .then((response) => {
          resolve(response);
        })
        .catch((e) => reject(e));
    }),

  getBanner: (bannerId) => {
    return new Promise((resolve, reject) => {
      Banner.findOne({
        where: {
          bannerId,
        },
      })
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  getHighlightBanner: () => {
    return new Promise((resolve, reject) => {
      Banner.findOne({
        where: {
          isEmphasis: true,
        }
      })
        .then((response) => {
          console.log(response);
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  updateBanner: (input) =>
    new Promise((resolve, reject) => {
      const {
        bannerId,
        title,
        description,
        isEmphasis,
        bannerImage,
      } = input;

      if (isEmphasis) {
        Banner.update({
          isEmphasis: false,
        }, {
          where: {
            isEmphasis: true,
          }
        });
      }

      Banner.update(
        {
          title,
          description,
          isEmphasis,
          bannerImage,
        }, {
        where: {
          bannerId,
        }
      }).then((response) => {
        resolve(response);
      }).catch((response) => {
        reject(response);
      });
    }),

  deleteBanner: (bannerId) =>
    new Promise((resolve, reject) => {
      Banner.destroy({
        where: {
          bannerId,
        },
      })
        .then((response) => {
          resolve(response);
        })
        .catch((response) => {
          reject(response);
        });
    }),
};
