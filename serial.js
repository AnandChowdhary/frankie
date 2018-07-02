var SerialPort = require('serialport');
var port = new SerialPort('/dev/cu.wchusbserial1410', {
  baudRate: 9600
});
port.on('readable', function () {
  console.log('Data:', port.read());
});