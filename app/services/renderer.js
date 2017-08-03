var handlebars = require('handlebars');
var { JSDOM } = require('jsdom');
var isServer = require('./isServer');

module.exports = Renderer;

function Renderer(document, containerId) {
  this.document = document;
  this.container = this.document.getElementById(containerId || 'container');
}

Renderer.prototype.render = function (view, data) {
  if(isServer()) {
    this.container.innerHTML = view(data);
    var dom = new JSDOM(this.document.documentElement.innerHTML);
    this.res.status(200).send(dom.serialize());
  } else {
    this.container.innerHTML = handlebars.compile(view)(data);
  }
}