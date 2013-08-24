$(function() {
  var ws = new WebSocket('ws://localhost:8080/master');
  ws.onmessage = function(event) {
    var msg = JSON.parse(event.data);

    if (msg.func === 'verified') {
      $('#inject')
        .prop('disabled', false)
        .on('click', function() {
          ws.send(JSON.stringify({
            func: 'attach',
            args: {
              contentScript: 'document.location = "http://www.google.co.jp"'
            }
          }));
        });
    }
  }

});
