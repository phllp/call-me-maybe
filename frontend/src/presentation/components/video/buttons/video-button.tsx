import { useAppDispatch, useAppSelector } from '@store/hooks';
import { Video, VideoOff } from 'lucide-react';
import { FC, RefObject, useEffect, useState } from 'react';
import startLocalVideoStream from './startLocalVideoStream';

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

    if (callStatus.haveMedia) {
      /** The button was clicked and  */
      const localStream = streams.find((stream) => stream.who == 'localStream');
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
        className="videoBtnContainer flex flex-grow  items-center justify-center hover:bg-rose-300 hover:rounded-r-md"
      >
        {callStatus.video ? (
          <VideoOff className="text-rose-900" />
        ) : (
          <Video className="text-rose-900" />
        )}
      </button>
    </>
  );
};

export default VideoButton;
