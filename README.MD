## Libraries

* Director - routing
* Handlebars - templates
* Axios - HTTP
* JSDOM + Handlebars - server side rendering

## App structure

api/ - API server

app/ - application code
  config/routes.js - route definitions
  routes/ - route handlers
  services/
    api.js - API client
    renderer.js - rendering abstraction
    router.js - router abstraction
  views/ - templates
    layout.html - base layout
    partials/ - route templates
    
public/ - public assets

client.js - client bundle entry point
server.js - server-specific code