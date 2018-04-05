'use strict';

var mysql = require('mysql');

exports.query = (sql, args) => {
  return new Promise((resolve, reject) => {
    var connection = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "root",
      database: "music"
    });
    connection.query(sql, args, (err, rows) => {
      if (err)
        return reject(err);
      resolve(rows);
    })
  })
}

exports.close = () => {
  return new Promise((resolve, reject) => {
    this.connection.end(err => {
      if (err)
        return reject(err);
      resolve();
    })
  })
}