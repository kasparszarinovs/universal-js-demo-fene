var Director = require('director');
var isServer = require('./isServer');

module.exports = Router;

function Router(renderer, routes) {
  this.renderer = renderer;
  this.router = isServer() 
    ? new Director.http.Router() 
    : new Director.Router().configure({ html5history: true }).init();
  this._loadRoutes(routes);
}

Router.prototype._loadRoutes = function(routes) {
  var router = this;

  Object.keys(routes).forEach(function (route) {  
    router.on(route, (function (route) {
      var routeHandler = routes[route];
      var handlerContext = {
        renderer: router.renderer
      };

      return function handleRoute() {
        if (isServer()) {
          router.renderer.res = this.res;
        }

        routeHandler.apply(handlerContext, arguments);
      };
      
    })(route));
  });
}

Router.prototype.on = function (route, handler) {
  var routeFn = isServer() ? 'get' : 'on';
  this.router[routeFn](route, handler);
}

Router.prototype.setRoute = function (route) {
  this.router.setRoute.call(this.router, route);
}

Router.prototype.dispatch = function () {
  this.router.dispatch.apply(this.router, arguments);
}
