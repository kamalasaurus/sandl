void function() {
  'use strict';

  var q = [];
  var respLength = 0;

  var createEvent = function(eventName) {
    var event;
    try {
      event = new Event(eventName);
    } catch (e) {
      event = document.createEvent('Event');
      event.initEvent(name, true, true);
    } finally {
      return event;
    }
  };

  var scriptsLoaded = createEvent('scriptsloaded');

  // create placeholders for modules to massage the race condition.
  var queue = function(src) {
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = src;
    script.addEventListener('load', function() {
      q.push(true);
      tryInitialize();
    });
    return script;
  };

  var load = function(script) {
    document.body.appendChild(script);
  };

  var tryInitialize = function() {
    if (q.length === respLength) {
      document.dispatchEvent(scriptsLoaded);
    }
  };

  var request = new XMLHttpRequest();
  request.open('get', 'framework/modules.json', true);
  request.send();

  request.addEventListener('readystatechange', function() {
    if (request.readyState === 4 && request.status === 200) {
      var resp = JSON.parse(request.response)
      respLength = resp.length;
      resp
        .map(queue)
        .forEach(load);
    }
  });

}();

