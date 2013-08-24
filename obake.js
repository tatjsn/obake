var WebSocketServer = require('ws').Server;
var http = require('http');
var express = require('express');
var app = express();

app.use(express.static(__dirname + '/public'));

var server = http.createServer(app);
server.listen(8080);

var master = null;
var slave = null;

var wss = new WebSocketServer({server: server});
wss.on('connection/master', function(ws) {
  if (master !== null) {
    console.log('[master]already has master');
    return;
  }
  master = ws;
  master.on('message', function(message) {
    console.log('[master]received: %s', message);
    if (slave !== null) {
      slave.send(message);
    }
  });
  master.on('close', function() {
    master = null;
    console.log('[master]disconnected');
  });
  master.on('error', function(error) {
    console.log('[master]error: %s', error);
  });

  master.send(JSON.stringify({
    func: 'verified'
  }));
});

wss.on('connection/slave', function(ws) {
  if (slave !== null) {
    console.log('[slave]already has slave');
    return;
  }
  slave = ws;
  slave.on('message', function(message) {
    console.log('[slave]received: %s', message);
    if (master !== null) {
      master.send(message);
    }
  });
  slave.on('close', function() {
    slave = null;
    console.log('[slave]disconnected');
  });
  slave.on('error', function(error) {
    console.log('[slave]error: %s', error);
  });

  slave.send(JSON.stringify({
    func: 'verified'
  }));
});

console.log('server started');
