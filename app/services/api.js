var axios = require('axios')

axios.defaults.baseURL = 'http://localhost:3001';
// axios.defaults.withCredentials = true;
axios.defaults.headers.common['Accept'] = 'application/json';
axios.defaults.headers.common['Content-Type'] = 'application/json';

var api = {};

['get', 'post', 'put', 'patch', 'delete'].forEach(function (method) {
  api[method] = function () {
    return axios[method].apply(null, arguments);
  }
});

module.exports = api;
