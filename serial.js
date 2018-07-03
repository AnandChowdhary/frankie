var WebSocket = require('ws');
var SerialPort = require('serialport');

const wss = new WebSocket.Server({ port: 8085 });

wss.on('connection', function connection(ws) {
  console.log('connected');
  ws.on('error', function error(error) {
    console.log('error: %s', error);
  });
  var value = false;
  var port = new SerialPort('/dev/cu.wchusbserial1410', {
    baudRate: 9600
  });
  ws.on('message', function incoming(message) {
    console.log('received: %s', message);
    try {
      port.write(message);
    } catch (e) {}
  });
  port.on('data', function (data) {
    try {
      ws.send(data.toString());
    } catch (e) {}
  });
  port.on('error', function (error) {
    console.log('error', error);
    process.exit(1);
  });
});