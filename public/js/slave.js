$(function() {
  var ws = new WebSocket('ws://localhost:8080/slave');
  ws.onopen = function() {
    ws.send('hello from slave');
  }
});
