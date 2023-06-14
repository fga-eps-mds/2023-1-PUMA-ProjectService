const express = require('express');

const routes = express.Router();
const bannerController = require('../controller/BannerController');

routes.get('/banner', (req, res) => {
  bannerController.getAllBanners().then((response) => {
    res.status(200).json(response);
  });
});

routes.post('/banner', (req, res) => {
  bannerController.addBanner(req.body).then((response) => {
    res.status(200).json(response);
  }).catch((error) => {
    res.status(400).json(error);
  });
});

module.exports = routes;
