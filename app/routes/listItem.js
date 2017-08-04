var api = require('../services/api');
var isServer = require('../services/isServer');
var view = require('../views/partials/listItem.hbs');

module.exports = routeHandler;

function routeHandler(id) {
  var handler = this;
  api.get(`/werewolves/${id}.json`).then(function (response) {
    var data = response.data;
    handler.renderer.render(view, {
      name: data.name,
      imageUrl: data.imageUrl,
      renderedOn: isServer() ? 'server' : 'client',
    });
  }).catch(console.log.bind(console));
}
