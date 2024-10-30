import { Dispatch } from '@reduxjs/toolkit';
import { StreamState } from '@store/features/streams/streams-slice';
import { updateCallStatus } from '@store/features/call-status/call-status-slice';
/**
 * Update all the peerConnections available, adding the local stream video tracks to them
 *
 * Also updates the callStatus state, setting video = enabled
 * @param streams
 * @param dispatch
 * @returns
 */
const startLocalVideoStream = (streams: StreamState[], dispatch: Dispatch) => {
  const localStream = streams.find((stream) => stream.who == 'localStream');
  if (!localStream) {
    console.error('Start Video Stream: No localStream provided.');
    return;
  }

  streams.forEach((curentStream) => {
    if (curentStream.who != 'localStream') {
      localStream.stream.getVideoTracks().forEach((t) => {
        curentStream.peerConnection?.addTrack(t, curentStream.stream);
      });
    }
    dispatch(updateCallStatus({ video: 'enabled' }));
  });
};

export default startLocalVideoStream;
