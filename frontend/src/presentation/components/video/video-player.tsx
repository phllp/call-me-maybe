import { FC, RefObject, useEffect } from 'react';

interface VideoPlayerProps {
  remoteStream: MediaStream | null;
  localStream: MediaStream | null;
  remoteVideoRef: RefObject<HTMLVideoElement>;
  localVideoRef: RefObject<HTMLVideoElement>;
}

const VideoPlayer: FC<VideoPlayerProps> = ({
  remoteStream,
  localStream,
  remoteVideoRef,
  localVideoRef,
}) => {
  /**
   * Attach streams to the video elements
   */
  useEffect(() => {
    if (remoteVideoRef.current && remoteStream) {
      remoteVideoRef.current.srcObject = remoteStream;
    }
    if (localVideoRef.current && localStream) {
      localVideoRef.current.srcObject = localStream;
    }
  }, [remoteStream, localStream, remoteVideoRef, localVideoRef]);

  return (
    <div className="relative w-full h-full bg-gray-200 border-2 border-rose-800 rounded-md">
      <video
        ref={remoteVideoRef}
        autoPlay
        className="w-full h-full object-cover rounded-lg"
      />

      <div className="absolute bottom-4 right-4 w-32 h-24 bg-black rounded-lg overflow-hidden">
        <video
          ref={localVideoRef}
          autoPlay
          muted
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default VideoPlayer;
