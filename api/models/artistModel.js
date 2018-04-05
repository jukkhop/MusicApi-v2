'use strict';

var db = require('../../database');

exports.getArtists = () => {
  return new Promise((resolve, reject) => {
    var artistRows, songRows, artists;
    db.query('SELECT * FROM artists')
      .then(rows => {
        artistRows = rows;
        return db.query('SELECT * FROM songs');
      })
      .then(rows => {
        songRows = rows;
        var artists = [];
        for (var i = 0; i < artistRows.length; i++) {
          var artist = {
            Id: artistRows[i].Id,
            Name: artistRows[i].Name,
            Songs: []
          }
          for (var j = 0; j < songRows.length; j++) {
            if (songRows[j].ArtistId == artistRows[i].Id) {
              var song = {
                Id: songRows[j].Id,
                Name: songRows[j].Name,
              };
              artist["Songs"].push(song);
            }
          }
          artists.push(artist);
        }
        resolve(artists);
      })
      .catch(err => {
        return reject(err);
      })
  })
}

exports.addArtist = (artist) => {
  return new Promise((resolve, reject) => {
    db.query('INSERT INTO artists SET ?', artist)
      .then(res => {
        return db.query('SELECT * FROM artists WHERE Id = ?', res.insertId);
      })
      .then(row => {
        resolve(row);
      })
      .catch(err => {
        return reject(err);
      })
  })
}

exports.deleteArtist = (id) => {
  return new Promise((resolve, reject) => {
    var deletedRow;
    db.query('SELECT * FROM artists WHERE Id = ?', id)
      .then(row => {
        deletedRow = row;
        return db.query('DELETE FROM artists WHERE Id = ?', id);
      })
      .then(() => {
        resolve(deletedRow);
      })
      .catch(err => {
        return reject(err);
      })
  })
}
