/* eslint-disable */
const db = require("../../dbconfig/dbConfig");
const Banner = require("../db/model/Banner");

module.exports = {
  addBanner: (banner) =>
    new Promise((resolve, reject) => {
      const { title, description, isEmphasis, bannerImage, bannerPdf } =
        banner;
      Banner.create({
        title,
        description,
        isEmphasis,
        bannerImage,
        bannerPdf,
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

  updateBanner: (input) =>
    new Promise((resolve, reject) => {
      const {
        bannerId,
        title,
        description,
        isEmphasis,
        bannerImage,
        bannerPdf,
      } = input;
      Banner.update(
        {
          title,
          description,
          isEmphasis,
          bannerImage,
          bannerPdf,
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
      Banner.update(
        {
          deleted: true,
        },
        {
          where: {
            bannerId: bannerId,
          },
        }
      )
        .then((response) => {
          resolve(response);
        })
        .catch((response) => {
          reject(response);
        });
    }),
};
