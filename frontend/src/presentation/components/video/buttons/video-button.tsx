import { useAppDispatch, useAppSelector } from '@store/hooks';
import { Video, VideoOff } from 'lucide-react';
import { FC, RefObject, useEffect, useState } from 'react';
import startLocalVideoStream from './startLocalVideoStream';
import { updateCallStatus } from '@store/features/call-status/call-status-slice';

type VideoButtonProps = {
  localVideoEl: RefObject<HTMLVideoElement>;
};

const VideoButton: FC<VideoButtonProps> = ({ localVideoEl }) => {
  const callStatus = useAppSelector((state) => state.callStatus);
  const streams = useAppSelector((state) => state.streams);
  const dispatch = useAppDispatch();

  const [pendingUpdate, setPendingUpdate] = useState(false);

  const videoBtnHandler = () => {
    if (!localVideoEl.current) {
      console.error('Video Button: local video element not found');
      return;
    }
    const localStream = streams.find((stream) => stream.who == 'localStream');
    const tracks = localStream?.stream.getVideoTracks();

    if (callStatus.video == 'enabled') {
      /** If the video is enabled, disable it  */
      dispatch(updateCallStatus({ video: 'disabled' }));
      /** Disables the video tracks */
      tracks?.forEach((track) => (track.enabled = false));
    } else if (callStatus.video == 'disabled') {
      /** If the video is disabled, enable it */
      dispatch(updateCallStatus({ video: 'enabled' }));
      /** Enables the video tracks */
      tracks?.forEach((track) => (track.enabled = true));
    } else if (callStatus.haveMedia) {
      /** The button was clicked and  */
      localVideoEl.current.srcObject = localStream!.stream;

      startLocalVideoStream(streams, dispatch);
    } else {
      /** The button was clicked, but media access not granted yet */
      setPendingUpdate(true);
    }
  };

  /**
   * Runs when the media access was granted, making sure that the MediaStream
   * will be added to our video feed
   */
  useEffect(() => {
    if (pendingUpdate && callStatus.haveMedia) {
      if (!localVideoEl.current) {
        console.error('Video Button: local video element not found');
        return;
      }
      setPendingUpdate(false);
      const localStream = streams.find((stream) => stream.who == 'localStream');
      localVideoEl.current.srcObject = localStream!.stream;
    }
  }, [callStatus.haveMedia, localVideoEl, pendingUpdate, streams]);

  return (
    <>
      <button
        onClick={videoBtnHandler}
        className={`videoBtnContainer flex flex-grow items-center justify-center  hover:rounded-r-md ${callStatus.video == 'disabled' ? 'bg-rose-300 hover:bg-rose-400' : 'bg-green-300 hover:bg-green-400'} rounded-r-md`}
      >
        {callStatus.video == 'enabled' ? (
          <Video className="text-gray-900" />
        ) : (
          <VideoOff className="text-gray-900" />
        )}
      </button>
    </>
  );
};

export default VideoButton;
