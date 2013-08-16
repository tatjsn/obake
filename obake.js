var WebSocketServer = require('ws').Server;
var wss = new WebSocketServer({port: 8080});

wss.on('connection', function(ws) {
  console.log('url: ' + ws.upgradeReq.url); // '/path'
  ws.on('message', function(message) {
    console.log('received: %s', message);
  });
  ws.send('hello from server');
});
console.log('server started');
