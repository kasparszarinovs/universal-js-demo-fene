var Renderer = require('./app/services/renderer');
var Router = require('./app/services/router');
var routes = require('./app/config/routes');

var renderer = new Renderer(document, 'container');
var router = new Router(renderer, routes);

function loadDOMEvents() {
  // intercept click events on links
  document.addEventListener('click', function (e) {
    var el = e.target;

    if (el && el.nodeName === 'A') {
      router.setRoute(el.attributes.href.value);
      e.preventDefault();
      return false;
    }
  }, false);
}

window.onload = function () {
  loadDOMEvents();
  console.log('Client initialized');
};