const express = require('express');

const routes = express.Router();
const bannerController = require('../controller/BannerController');

routes.get('/banner', (req, res) => {
  bannerController.getAllBanners().then((response) => {
    res.status(200).json(response);
  });
});

routes.get('/banner/highlight', (req, res) => {
  bannerController.getHighlightBanner().then((response) => {
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

routes.get('/banner/:bannerId', (req, res) => {
  const bannerId = Number(req.params.bannerId);
  bannerController.getBanner(bannerId).then((response) => {
    res.status(200).json(response);
  });
});

routes.put('/banner/:bannerId', (req, res) => {
  const bannerId = req.params.bannerId;
  bannerController.updateBanner({ ...req.body, bannerId })
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((error) => {
      res.status(400).json(error);
    });
});


routes.delete('/banner/:bannerId', (req, res) => {
  bannerController.deleteBanner(req.params.bannerId).then((response) => {
    res.status(200).json(response.data);
  }).catch((error) => {
    res.status(400).json({ error });
  });
});

module.exports = routes;
