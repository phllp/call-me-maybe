import { FC, RefObject } from 'react';
// import HangupButton from '@components/video/hangup-button';
import AudioButton from './buttons/audio-button';
import VideoButton from './buttons/video-button';

type ActionButtonsProps = {
  localVideoEl: RefObject<HTMLVideoElement>;
};

/* eslint-disable @typescript-eslint/no-unused-vars */
const ActionButtons: FC<ActionButtonsProps> = ({
  localVideoEl,
}: ActionButtonsProps) => {
  return (
    <div className="flex bg-gray-200 border border-gray-600 h-14 w-24 rounded-md relative">
      <div className="relative flex flex-grow">
        <AudioButton localVideoEl={localVideoEl} />
      </div>
      <div className="w-0 h-full flex border-r border-gray-600"></div>
      <div className="relative flex flex-grow">
        <VideoButton localVideoEl={localVideoEl} />
      </div>
    </div>
  );
};

export default ActionButtons;
