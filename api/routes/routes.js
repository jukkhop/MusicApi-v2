module.exports = (app) => {
  var artists = require('../controllers/artistController');
  var songs = require('../controllers/songController');

  app.get('/artists', artists.getArtists)
    .post('/artists', artists.addArtist)
    .delete('/artists/:id', artists.deleteArtist);

  app.get('/songs', songs.getSongs)
    .post('/songs', songs.addSong)
    .delete('/songs/:id', songs.deleteSong);
}
