var WebSocketServer = require('ws').Server;
var http = require('http');
var express = require('express');
var app = express();

app.use(express.static(__dirname + '/public'));

var server = http.createServer(app);
server.listen(8080);

var wss = new WebSocketServer({server: server});
wss.on('connection/master', function(ws) {
  ws.on('message', function(message) {
    console.log('[master]received: %s', message);
  });
  ws.on('close', function() {
    console.log('[master]closed');
  });

  ws.send('[master]connected');
});

wss.on('connection/slave', function(ws) {
  ws.on('message', function(message) {
    console.log('[slave]received: %s', message);
  });
  ws.on('close', function() {
    console.log('[slave]closed');
  });

  ws.send('[slave]connected');
});

console.log('server started');
