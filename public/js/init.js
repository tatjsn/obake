$(function() {
  var ws = new WebSocket('ws://localhost:8080/master');
  ws.onopen = function() {
    ws.send('hello from master');
  }

  $('#inject').on('click', function() {
    ws.send('send inject command');
  });
});
