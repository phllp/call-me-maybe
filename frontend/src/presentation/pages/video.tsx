import VideoPlayer from '@components/video/video-player';
import { useState } from 'react';

const Video: React.FC = () => {
  const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);

  return (
    <div className="flex flex-grow w-full h-full items-center justify-center">
      <div className="w-7/12">
        <VideoPlayer localStream={localStream} remoteStream={remoteStream} />
      </div>
    </div>
  );
};

export default Video;
