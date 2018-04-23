var model = require('../models/songModel');

exports.getSongs = (req, res) => {
  model.getSongs()
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      res.status(400);
      res.send(err);
    })
}

exports.addSong = (req, res) => {
  model.addSong(req.body)
    .then(data => {
      res.json(data[0]);
    })
    .catch(err => {
      res.status(400);
      res.send(err);
    })
}

exports.deleteSong = (req, res) => {
  model.deleteSong(req.params.id)
    .then(data => {
      res.json(data[0]);
    })
    .catch(err => {
      res.status(400);
      res.send(err);
    })
}
