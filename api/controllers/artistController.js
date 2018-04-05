'use strict';

var model = require('../models/artistModel');

exports.getArtists = (req, res) => {
  model.getArtists()
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      res.send(err);
    })
}

exports.addArtist = (req, res) => {
  model.addArtist(req.body)
    .then(data => {
      res.json(data[0]);
    })
    .catch(err => {
      res.send(err);
    })
}

exports.deleteArtist = (req, res) => {
  model.deleteArtist(req.params.id)
    .then(data => {
      res.json(data[0]);
    })
    .catch(err => {
      res.send(err);
    })
}