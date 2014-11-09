var http = require('http');
var io = require('socket.io');
var url = require("url");
var express = require('express');
var _ = require('underscore');
var app = express();

var persistence = require('./persistence.js');

app.set('view engine', 'ejs');
app.set('view options', { layout: false });
app.use(express.methodOverride());
app.use(express.bodyParser());  
app.use(app.router);
app.use('/public', express.static('public'));

var server = http.createServer(app);

var worker = require('socket.io').listen(8081);

var io = require('socket.io').listen(server)
server.listen(8080);

app.get('/index.html', function (req, res) {
  res.render('index');
});

app.get('/login.html', function (req, res) {
  res.render('login');
});

app.get('/register.html', function (req, res) {
  res.render('register');
});

io.sockets.on('connection', function (socket) {
  
  socket.on('start', function(data) {
    socket.send('started');
  
  });
  socket.on('getPattern', function(data){
    persistence.getPattern(data, socket, worker);
  });
  
  socket.on('playerError', function(data) {
        worker.sockets.emit('playerError', data);
  });
  
  socket.on('end', function(data) {
        worker.sockets.emit('gameFinished', data);
        persistence.getAllGames(worker);

  });
});

worker.sockets.on('connection', function(socket) {
  socket.on('saveUser', function(data) {
        persistence.insertGame(data.userName, data.gameTime, data.card);
  });
});