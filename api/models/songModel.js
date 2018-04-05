'use strict';

var db = require('../../database');

exports.addSong = (song) => {
  return new Promise((resolve, reject) => {
    db.query('INSERT INTO songs SET ?', song)
      .then(res => {
        return db.query('SELECT * FROM songs WHERE Id = ?', res.insertId);
      })
      .then(row => {
        resolve(row);
      })
      .catch(err => {
        return reject(err);
      })
  })
}

exports.deleteSong = (id) => {
  return new Promise((resolve, reject) => {
    var deletedRow;
    db.query('SELECT * FROM songs WHERE Id = ?', id)
      .then(row => {
        deletedRow = row;
        return db.query('DELETE FROM songs WHERE Id = ?', id);
      })
      .then(() => {
        resolve(deletedRow);
      })
      .catch(err => {
        return reject(err);
      })
  })
}
