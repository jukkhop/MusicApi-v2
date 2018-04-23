var config = require('./config');

var express = require('express'),
  app = express(),
  port = process.env.PORT || config.server.port,
  bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var routes = require('./api/routes/routes');
routes(app);

app.listen(port);
console.log('Server started on: ' + port);
