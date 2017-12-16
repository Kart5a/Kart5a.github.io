// Imports
var express = require('express');
var socket = require('socket.io');
var fs = require('fs');
var http = require('http');

// Muuta
var app = express();
var server = http.createServer();

server.listen(3000, function() {
  console.log("My socket server is running");
});

app.use(express.static('public'));

// io on juttu joka luo ja vastaanottaa yhteyksiä (socket)
var io = socket(server);

// Ainakun yhteys tulee -> luodaan uusi socket
io.sockets.on('connection', newConnection);

// KAIKKI LIITTYVÄ JUTTU
function newConnection(socket) {
  console.log('new connection: ' + socket.id);

  // Lähettää jo olevan canvaksen tiedot
  var canvas = JSON.parse(fs.readFileSync("canvas.json"));

  socket.emit('canvas', canvas);

  socket.on('clicked', changeColor);
  socket.on('fill', fillCanvas);

  function changeColor(data) {
    var canvas = JSON.parse(fs.readFileSync("canvas.json"));
    canvas[data[0]] = data[1];
    var temp = JSON.stringify(canvas, null, 2);
    fs.writeFile('canvas.json', temp);

    io.sockets.emit('canvas', canvas);
  }

  function fillCanvas(c) {
    for (var i in canvas) {
      canvas[i] = c;
    }
    var temp = JSON.stringify(canvas, null, 2);
    fs.writeFile('canvas.json', temp);

    io.sockets.emit('canvas', canvas);
  }
}
