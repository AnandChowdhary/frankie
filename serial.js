var WebSocket = require('ws');
var SerialPort = require('serialport');

const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(message) {
    console.log('received: %s', message);
  });
  ws.send('something');
});

// var value = false;
// var port = new SerialPort('/dev/cu.wchusbserial1410', {
//   baudRate: 9600
// });
// port.on('data', function (data) {
//   console.log('Data:', data.toString());
// });