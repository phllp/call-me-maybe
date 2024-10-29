import ActionButtons from '@components/video/action-buttons';
import VideoPlayer from '@components/video/video-player';
import { addStream } from '@store/features/streams/streams-slice';
import { useAppDispatch } from '@store/hooks';
import { useEffect, useRef, useState } from 'react';

const Video: React.FC = () => {
  const dispatch = useAppDispatch();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);

  const smallFeedEl = useRef<HTMLVideoElement>(null);
  const largeFeedEl = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const fetchMedia = async () => {
      const constraints = {
        audio: true,
        video: false,
      };

      try {
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        dispatch(addStream({ who: 'localStream', stream }));
      } catch (error) {
        console.error(`Error fetching user media: ${error}`);
      }
    };
    fetchMedia();
  }, []);

  return (
    <div className="flex flex-grow w-full h-full items-center justify-center flex-col">
      <div className="w-7/12 mb-8">
        <VideoPlayer
          localStream={localStream}
          remoteStream={remoteStream}
          localVideoRef={smallFeedEl}
          remoteVideoRef={largeFeedEl}
        />
      </div>
      <ActionButtons localVideoEl={smallFeedEl} />
    </div>
  );
};

export default Video;
