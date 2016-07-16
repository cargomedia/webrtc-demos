function createPcOffer(signaling) {
  var pc = new RTCPeerConnection();

  signaling.on('icecandidate.answer', function(event) {
    pc.addIceCandidate(new RTCIceCandidate(event.candidate));
  });
  pc.onicecandidate = function(event) {
    if (event.candidate) {
      signaling.send('icecandidate.offer', {candidate: event.candidate});
    }
  };

  signaling.on('pc.answer', function(event) {
    pc.setRemoteDescription(new RTCSessionDescription(event.jsep))
  });
  navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true
    })
    .then(function(mediaStream) {
      document.getElementById('offer').srcObject = mediaStream;
      pc.addStream(mediaStream);

      return pc.createOffer({
        offerToReceiveAudio: 1,
        offerToReceiveVideo: 1
      }).then(function(jsep) {
        return pc.setLocalDescription(jsep);
      }).then(function() {
        signaling.send('pc.offer', {jsep: pc.localDescription})
      });
    });
}
