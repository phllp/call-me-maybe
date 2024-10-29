import ActionButtons from '@components/video/action-buttons';
import VideoPlayer from '@components/video/video-player';
import { useRef, useState } from 'react';

const Video: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);

  const smallFeedEl = useRef(null);
  const largeFeedEl = useRef(null);

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
      <ActionButtons smallFeedEl={smallFeedEl} />
    </div>
  );
};

export default Video;
