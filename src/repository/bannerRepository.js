/* eslint-disable */
const db = require('../../dbconfig/dbConfig');
const Banner = require('../db/model/Banner');

module.exports = {
  addBanner: (banner) => new Promise((resolve, reject) => {
    const { title, description, isEmphasis, bannerImage, bannerPdf } = banner;
    Banner.create({
      title,
      description,
      isEmphasis,
      bannerImage,
      bannerPdf,
    }).then((response) => {
      resolve(response);
    }).catch((e) => {
      console.log('Repository', e);
      reject(e);
    });
  }),

  getAllBanners: () => new Promise((resolve, reject) => {
    Banner.findAll().then((response) => {
      resolve(response);
    }).catch((e) => reject(e));
  }),
};