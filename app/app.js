var express = require('express');
var logger = require('morgan');
var path = require('path');
var app = express();

app.use(logger('dev'));
app.use(express.static(path.join(__dirname)));

var port = process.env.PORT || 3000;

app.set('port', port);

app.listen(port, function() {
  console.log('open http://localhost:' + port);
});
