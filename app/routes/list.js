
var api = require('../services/api');
var isServer = require('../services/isServer');
var view = require('../views/partials/list.hbs');

module.exports = routeHandler;

function routeHandler () {
  api.get('/werewolves.json').then(response => {
    var data = response.data;
    this.renderer.render(view, {
      items: data,
      renderedOn: isServer() ? 'server' : 'client',
    });
  }).catch(console.log.bind(console));
}