var localSignaling = require('./local-signaling').getHandler();

function PeerConnection() {
  this._pc = new RTCPeerConnection();
  this._pc.onicecandidate = this.onIceCandidate.bind(this);
  localSignaling.on('iceCandidate');
}

PeerConnection.prototype.onIceCandidate = function(event) {
  if (event.candidate) {
    localSignaling.emit(this, 'iceCandidate', new RTCIceCandidate(event.candidate));
    getOtherPc(pc).addIceCandidate(new RTCIceCandidate(event.candidate),
      function() {
        onAddIceCandidateSuccess(pc);
      },
      function(err) {
        onAddIceCandidateError(pc, err);
      }
    );
    trace(getName(pc) + ' ICE candidate: \n' + event.candidate.candidate);
  }

};

module.exports = PeerConnection;
