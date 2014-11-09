var mysql = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'tomandjerry31',
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

exports.insertGame = function(userName, time, cardId){
  connection.query("SET @a1 ='" + userName + "';");
  connection.query("SET @a2 = " + time + ";");
  connection.query("SET @a3 ='" + cardId + "';");
  
  connection.query('CALL ins_gamewithdata(@a1, @a2, @a3);', function(err, rows, fields) {
    if (err) throw err;    
    console.log("Score added");
  });
};

exports.getAllGames = function( worker){
  connection.query('CALL get_allgames();', function(err, rows, fields) {
    if (err) throw err;    
    worker.emit('getTopScores', rows);
  });
};

exports.getPattern = function(cardId, socket, worker){
  connection.query("SET @a1 ='" + cardId + "';");
  connection.query("CALL get_carddirectionsbyidentcode(@a1);", function(err, rows, fields) {
  if (err) throw err;
  worker.sockets.emit('getPattern',rows[0][0]); 
  socket.send(rows[0][0].directions);
  });
};

