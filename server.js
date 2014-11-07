var http = require('http');
var io = require('socket.io');
var url = require("url");
var express = require('express');
var _ = require('underscore');
var app = express();


app.set('view engine', 'ejs');
app.set('view options', { layout: false });
app.use(express.methodOverride());
app.use(express.bodyParser());  
app.use(app.router);
app.use('/public', express.static('public'));

var server = http.createServer(app);
var io = require('socket.io').listen(server);
server.listen(8080);

app.get('/index.html', function (req, res) {
  res.render('index');
});

app.get('/login.html', function (req, res) {
  res.render('login');
});

io.sockets.on('connection', function (socket) {
  socket.on('newimg', function(data) {
        console.log(data);
  });
  socket.on('start', function(data) {
        console.log(data);
  });
  socket.on('end', function(data) {
        console.log(data);
  });
});