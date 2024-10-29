import { RefObject } from 'react';
// import HangupButton from '@components/video/hangup-button';
import AudioButton from './buttons/audio-button';
import VideoButton from './buttons/video-button';

type ActionButtonsProps = {
  smallFeedEl: RefObject<HTMLVideoElement>;
};

/* eslint-disable @typescript-eslint/no-unused-vars */
const ActionButtons = ({ smallFeedEl }: ActionButtonsProps) => {
  return (
    <div className="flex bg-rose-500 h-14 w-24 rounded-md">
      <AudioButton />
      <div className="w-0 h-full flex border-r-2 border-rose-900"></div>
      <VideoButton />
    </div>
  );
};

export default ActionButtons;
