$(function() {
  var ws = new WebSocket('ws://localhost:8080/slave');
  ws.onmessage = function(event) {
    var msg = JSON.parse(event.data);

    console.log(msg.func);
    console.log(msg.args);
  }
});
