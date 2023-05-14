/* eslint-disable */
const express = require('express');

const routes = express.Router();
const pumaInfoController = require('../controller/PumaInfoController');

routes.get('/pumaInfo', (req, res) => {
  pumaInfoController.getPuma_Infos().then((response) => {
    res.status(200).json(response);
  });
});


routes.put('/pumaInfo', (req, res) => {
  pumaInfoController.updatePuma_Info(req.body).then((response) => {
    res.status(200).json(response);
  }).catch((response) => {
    res.status(400).json(response);
  });
});


module.exports = routes;