function createPcAnswer(signaling) {
  var pc = new RTCPeerConnection();

  signaling.on('icecandidate.offer', function(event) {
    pc.addIceCandidate(new RTCIceCandidate(event.candidate));
  });
  pc.onicecandidate = function(event) {
    if (event.candidate) {
      signaling.send('icecandidate.answer', {candidate: event.candidate});
    }
  };

  pc.addEventListener('addstream', function(event) {
    document.getElementById('answer').srcObject = event.stream;
  });

  signaling.on('pc.offer', function(event) {
    pc.setRemoteDescription(new RTCSessionDescription(event.jsep))
      .then(function() {
        return pc.createAnswer()
          .then(function(jsep) {
            return pc.setLocalDescription(jsep);
          })
          .then(function() {
            signaling.send('pc.answer', {jsep: pc.localDescription})
          });
      });
  });
}
