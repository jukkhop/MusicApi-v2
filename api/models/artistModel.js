var Database = require('../../database');

exports.getArtists = () => {
  return new Promise((resolve, reject) => {
    var db = new Database();
    db.query('SELECT * FROM artists')
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

exports.addArtist = (artist) => {
  return new Promise((resolve, reject) => {
    var db = new Database();
    db.query('INSERT INTO artists SET ?', artist)
      .then(res => {
        return db.query('SELECT * FROM artists WHERE Id = ?', res.insertId);
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

exports.deleteArtist = (id) => {
  return new Promise((resolve, reject) => {
    var db = new Database();
    var deletedRow;
    db.query('SELECT * FROM artists WHERE Id = ?', id)
      .then(row => {
        deletedRow = row;
        return db.query('DELETE FROM artists WHERE Id = ?', id);
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
