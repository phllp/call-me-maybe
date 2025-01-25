import { StreamState } from '@store/features/streams/streams-slice';
/**
 * Update all the peerConnections available, adding the local stream audio tracks to them
 *
 * Also updates the callStatus state, setting video = enabled
 * @param streams
 * @param dispatch
 * @returns
 */
const startAudioStream = (streams: StreamState[]) => {
  const localStream = streams.find((stream) => stream.who == 'localStream');
  if (!localStream) {
    console.error('Start Audio Stream: No localStream provided.');
    return;
  }

  streams.forEach((curentStream) => {
    if (curentStream.who != 'localStream') {
      localStream.stream.getAudioTracks().forEach((t) => {
        curentStream.peerConnection?.addTrack(t, curentStream.stream);
      });
    }
  });
};

export default startAudioStream;
