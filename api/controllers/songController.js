'use strict';

var model = require('../models/songModel');

exports.addSong = (req, res) => {
  model.addSong(req.body)
    .then(data => {
      res.json(data[0]);
    })
    .catch(err => {
      res.send(err);
    })
}

exports.deleteSong = (req, res) => {
  model.deleteSong(req.params.id)
    .then(data => {
      res.json(data[0]);
    })
    .catch(err => {
      res.send(err);
    })
}
