import peerConfiguration from './stun-servers';

interface PeerConnection {
  peerConnection: RTCPeerConnection;
  remoteStream: MediaStream;
}

export default function createPeerConnection(
  addIce: (c: RTCIceCandidate) => void
): Promise<PeerConnection> {
  // eslint-disable-next-line no-async-promise-executor, @typescript-eslint/no-unused-vars
  return new Promise(async (resolve, reject) => {
    const peerConnection = await new RTCPeerConnection(peerConfiguration);
    const remoteStream = new MediaStream();

    peerConnection.addEventListener('signalingstatechange', (e) => {
      console.log('Signaling State Change');
      console.log(e);
    });

    peerConnection.addEventListener('icecandidate', (e) => {
      console.log('Found IceCandidate...');
      if (e.candidate) {
        //Emit to socket server
        addIce(e.candidate);
      }
    });

    peerConnection.addEventListener('track', (e) => {
      console.log('Track received from remote');
      e.streams[0].getTracks().forEach((track) => {
        remoteStream.addTrack(track);
        console.log('pai tah on');
      });
    });
    resolve({
      peerConnection,
      remoteStream,
    });
  });
}
