var express = require('express');
var cors = require('cors');
var fs = require('fs');
var api = express();
var port = process.env.PORT || 3001;

var data = JSON.parse(fs.readFileSync(__dirname + '/data.json', 'utf8'));

api.get('/werewolves.json', cors(), function (req, res) {
  res.json(data)
})

api.get('/werewolves/:id.json', cors(), function (req, res) {
  var id = parseInt(req.params.id, 10);
  var results = data.filter(function (item) {
    return item.id === id;
  });

  if (results.length) {
    res.json(results[0]);
  } else {
    res.json(404, { error: 'No werewolves here...' })
  }
})

api.listen(port, function () {
  console.info(`API listening on port ${port}`)
})

