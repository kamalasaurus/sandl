'use strict';

process.title = 'vast-handler';

const http = require('http');
const fs = require('fs');
const url = require('url');
const path = require('path');

const spawn = require('child_process').spawnSync;

const argv = require('minimist')(process.argv.slice(2));
const port = process.env.PORT || argv.port || '30080';

const openBrowser = require('./open-browser');

// make this a module instead of a script at some point...  the
// ability to manually call it is useful, though -- have a self
// executing wrapper for the script?
spawn( 'node', ['framework/add-modules.js'] );

openBrowser(port);

const mimeTypes =  {
  '.ico': 'image/x-icon',
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.json': 'application/json',
  '.css': 'text/css',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.wav': 'audio/wav',
  '.mp3': 'audio/mpeg',
  '.svg': 'image/svg+xml',
  '.pdf': 'application/pdf',
  '.doc': 'application/msword',
  '.eot': 'appliaction/vnd.ms-fontobject',
  '.ttf': 'application/font-sfnt'
};

function router(req, res) {

  console.log(`${req.method} ${req.url}`);

  const parsedUrl = url.parse(req.url);
  let pathname = `.${parsedUrl.pathname}`;

  fs.exists(pathname, function (exist) {
    if(!exist) { //404
      res.statusCode = 404;
      res.end(`File ${pathname} not found!`);
      return;
    }

    if (fs.statSync(pathname).isDirectory()) { //index.html
      pathname += '/index.html';
    }

    fs.readFile(pathname, function(err, data){
      if(err){ //500
        res.statusCode = 500;
        res.end(`Error getting the file: ${err}.`);
      } else {
        const ext = path.parse(pathname).ext; //extension for mime type
        res.setHeader('Content-type', mimeTypes[ext] || 'text/plain' );
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.end(data);
      }
    });
  });

}

const server = http
  .createServer(router);

if (argv.live) {

  const watch = require('watch');

  const WebSocketServer = require('ws').Server;
  const wss = new WebSocketServer({ server: server });

  wss.on('connection', function(ws) {

    function refresh() {
      spawn( 'node', ['framework/add-modules.js'] );
      ws.send('refreshing!', console.error);
    }

    ws.on('open', function() {
      var msg = 'live-refresh connected!';
      console.log(msg);
      ws.send(msg, console.error);
    });

    ws.on('message', console.log);

    watch.createMonitor(path.resolve(process.cwd(), 'src'), function(monitor) {

      monitor.on('created', refresh);
      monitor.on('changed', refresh);
      monitor.on('removed', refresh);

      ws.on('close', function() {
        monitor.stop();
      });

    });

  });

}

server
  .listen(port);

