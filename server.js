var express = require('express');
var app = express();
var mongoose = require('mongoose');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var routes = require('./routes/index');

mongoose.connect((process.env.MONGODB_URI || 'mongodb://localhost'));
var Todo = require('./models/todo');

app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(methodOverride('X-HTTP-Method-Override'));

app.use('/', routes);

app.get('*', function(request, response) {
  response.sendFile(__dirname + '/public/index.html');
});

app.listen(1337, function() {
  console.log('App listening on port 1337');
});
