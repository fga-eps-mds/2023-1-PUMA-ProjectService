const express = require('express');

const routes = express.Router();
const partnerController = require('../controller/PartnerController');

routes.get('/', (req, res) => {
  partnerController.getPartners().then((response) => {
    res.status(200).json(response);
  });
});

routes.get('/partner/:partnerId', (req, res) => {
  partnerController.getPartner({
    partnerId: parseInt(req.params.partnerId, 10),
  }).then((response) => {
    res.status(200).json(response);
  });
});

routes.put('/partner/:partnerId', (req, res) => {
  partnerController.updatePartner(req.body).then((response) => {
    res.status(200).json(response);
  }).catch((response) => {
    res.status(400).json(response);
  });
});

routes.delete('/partner/:partnerId', (req, res) => {
  partnerController.getPartner(req.params.partnerId).then((response) => {
    res.status(200).json(response.data);
  }).catch((error) => {
    res.status(400).json({ error });
  });
});

module.exports = routes;
