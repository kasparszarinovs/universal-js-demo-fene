
var api = require('../services/api');
var isServer = require('../services/isServer');
var view = require('../views/partials/list.hbs');

module.exports = routeHandler;

function routeHandler () {
  var handler = this;
  api.get('/werewolves.json').then(function (response) {
    var data = response.data;
    handler.renderer.render(view, {
      items: data,
      renderedOn: isServer() ? 'server' : 'client',
    });
  }).catch(console.log.bind(console));
}
