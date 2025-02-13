
// eslint-disable-next-line import/no-unresolved
const express = require('express');

const routes = express.Router();
const partnerProjectController = require('../controller/PartnerProjectController');

routes.get('/partnerProject', (req, res) => {
  partnerProjectController.getProjects().then((response) => {
    res.status(200).json({ response });
  }).catch((response) => {
    res.status(400).json({ response });
  });
});

routes.get('/partnerProject/:id', (req, res) => {
  const id = req.params.id
  partnerProjectController.getProject(id).then((response) => {
    res.status(200).json({ response });
  }).catch((response) => {
    res.status(400).json({ response });
  });
});

routes.put('/partnerProject/:id', (req, res) => {
  const id = req.params.id
  partnerProjectController.updateProject(id, req.body).then((response) => {
    res.status(200).json({ response });
  }).catch((response) => {
    res.status(400).json({ response });
  });
});

routes.delete('/partnerProject/:id', (req, res) => {
  const id = req.params.id
  partnerProjectController.deleteProject(id).then((response) => {
    res.status(200).json({ response });
  }).catch((response) => {
    res.status(400).json({ response });
  });
});

// TODO: Falta tratamento dos dados
routes.post('/partnerProject', (req, res) => {
  partnerProjectController.addProject(req.body).then((response) => {
    res.status(200).json({ response });
  }).catch((response) => {
    res.status(400).json({ response });
  });
});

module.exports = routes;