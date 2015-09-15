var fs = require('fs');
var path = require('path');

var bodyParser = require('body-parser');
var express = require('express');
var app = express();

app.use('/', express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/comments', function(req, res) {
  fs.readFile('comments.json', function(err, data) {
    res.setHeader('Cache-Control', 'no-cache');
    res.json(JSON.parse(data));
  });
});

app.post('/comments', function(req, res) {
  fs.readFile('comments.json', function(err, data) {
    var comments = JSON.parse(data);
    comments.push(req.body);
    fs.writeFile('comments.json', JSON.stringify(comments, null, 4), function(err) {
      res.setHeader('Cache-Control', 'no-cache');
      res.json(comments);
    });
  });
});

var server = app.listen(3000, function() {
  var host = server.address().address;
  var port = server.address().port;
  
  console.log('First react example, server listening at http://%s:%s', host, port);
});