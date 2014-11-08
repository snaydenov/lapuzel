var mysql = require('mysql');
var connection = mysql.createConnection({
  host     : '10.0.201.233',
  user     : 'root',
  password : 'kamenoqd',
  database : 'lapuzzle',
  multipleStatements: true
});

connection.connect();

//Users

exports.getUser = function(username, socket){
  connection.query('SELECT 1 + 1 AS solution', function(err, rows, fields) {
  if (err) throw err;
  
  socket.send(rows[0].solution);
  });
};

exports.insertUser = function(username, email, password, socket){
  connection.query('SELECT 1 + 1 AS solution', function(err, rows, fields) {
  if (err) throw err;

  console.log('The solution is: ', rows[0].solution);
  });
};

exports.userExists = function(username, email, socket){
  connection.query('SELECT 1 + 1 AS solution', function(err, rows, fields) {
  if (err) throw err;

  console.log('The solution is: ', rows[0].solution);
  });
};

exports.deleteUser = function(userId, socket){
  connection.query('SELECT 1 + 1 AS solution', function(err, rows, fields) {
  if (err) throw err;

  socket.send('1');
  });
};

//Game

exports.insertGame = function(userId, gameTime, gameDate, socket){
  connection.query('INSERT INTO games values(userId, gamem', function(err, rows, fields) {
  if (err) throw err;

  socket.send('1');
  });
};

exports.getPattern = function(cardId, socket, worker){
  connection.query("SET @a1 ='" + cardId + "';");
  connection.query("CALL get_carddirectionsbyidentcode(@a1);", function(err, rows, fields) {
  if (err) throw err;
  worker.sockets.emit('getPattern',rows[0][0].card_name); 
  socket.send(rows[0][0].directions);
  });
};

