var Database = require('../../database');

exports.getSongs = () => {
  return new Promise((resolve, reject) => {
    var db = new Database();
    db.query('SELECT * FROM songs')
      .then(rows => {
        db.close();
        resolve(rows);
      })
      .catch(err => {
        db.close();
        reject(err);
      })
  })
}

exports.addSong = (song) => {
  return new Promise((resolve, reject) => {
    var db = new Database();
    db.query('INSERT INTO songs SET ?', song)
      .then(res => {
        return db.query('SELECT * FROM songs WHERE Id = ?', res.insertId);
      })
      .then(row => {
        db.close();
        resolve(row);
      })
      .catch(err => {
        db.close();
        reject(err);
      })
  })
}

exports.deleteSong = (id) => {
  return new Promise((resolve, reject) => {
    var db = new Database();
    var deletedRow;
    db.query('SELECT * FROM songs WHERE Id = ?', id)
      .then(row => {
        deletedRow = row;
        return db.query('DELETE FROM songs WHERE Id = ?', id);
      })
      .then(() => {
        db.close();
        resolve(deletedRow);
      })
      .catch(err => {
        db.close();
        reject(err);
      })
  })
}
