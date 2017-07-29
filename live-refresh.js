(function() {

  var connection;

  function addConnectionEvents() {
    connection.addEventListener('open', function(msg) {/*console.log(msg)*/});
    connection.addEventListener('error', console.error);
    connection.addEventListener('message', function(msg) {
      console.log(msg);
      window.location.reload(true);
    });
  }

  function connectToSocket() {
    try {
      connection = new WebSocket('ws://' + window.location.host);
    } catch(e) {
      console.error(e);
      setTimeout(connectToSocket, 1000);
    } finally {
      addConnectionEvents();
    }
  }

  connectToSocket();

})();

