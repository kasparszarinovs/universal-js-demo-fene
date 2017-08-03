var express = require('express');
var server = express();
var { JSDOM } = require('jsdom');

var Renderer = require('./app/services/renderer');
var Router = require('./app/services/router');
var routes = require('./app/config/routes');

module.exports = server;

// Expose public directory
server.use(express.static(__dirname + '/public'));

require('stringify').registerWithRequire({
  extensions: ['.html'],
  minify: false
});

// Set up server-based router
var layout = require('./app/views/layout.html');
var { document } = (new JSDOM(layout)).window;
var renderer = new Renderer(document, 'container');
var router = new Router(renderer, routes);

// Set up router middleware
server.use(function (req, res, next) {
  router.dispatch(req, res, function (err) {
    if (err && err.status === 404) {
      next();
    }
  });
});


var port = process.env.PORT || 3000;
server.listen(port, function () {
  console.log('App server running on http://127.0.0.1/%s', port);
});