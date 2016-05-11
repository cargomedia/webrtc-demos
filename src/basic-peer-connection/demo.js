var util = require('util');
var Demo = require('../demo');

function BasicPeerConnection() {
}

util.inherits(BasicPeerConnection, Demo);

BasicPeerConnection.prototype.run = function() {
  this.log('start');
};

module.exports = BasicPeerConnection;
