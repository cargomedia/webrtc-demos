var util = require('util');
var Demo = require('../demo');
var IceCandidateCollector = require('./ice-candidate-listener');

function TrickleIceDemo() {
}

util.inherits(TrickleIceDemo, Demo);

TrickleIceDemo.prototype.run = function() {
  this.log('start');
  var pc = this._createPeerConnection();
  var candidateCollector = new IceCandidateCollector(pc);
  candidateCollector.on('complete', function(candidates) {
    this.log('finish', candidates);
  }.bind(this));
  this._startGatheringCandidates(pc);
};

TrickleIceDemo.prototype._createPeerConnection = function() {
  var iceServers = [{urls: ['stun:stun.l.google.com:19302']}];
  var iceTransports = 'all';//'relay', 'none';
  var config = {'iceServers': iceServers, iceTransportPolicy: iceTransports};
  var pcConstraints = {};

  //pcConstraints.optional = [{'googIPv6': true}];
  return new RTCPeerConnection(config, pcConstraints);
};

TrickleIceDemo.prototype._startGatheringCandidates = function(pc) {
  var offerOptions = {offerToReceiveAudio: 1};
  pc.createOffer(function(desc) {
    pc.setLocalDescription(desc);
  }, function(error) {
    console.error('Error creating offer: ', error);
  }, offerOptions);
};

module.exports = TrickleIceDemo;
