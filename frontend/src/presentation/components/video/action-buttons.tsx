import { RefObject, useRef } from 'react';
// import HangupButton from '@components/video/hangup-button';
import { useAppSelector, useAppDispatch } from '@store/hooks';
import { Mic, MicOff, Video, VideoOff } from 'lucide-react';
import { updateCallStatus } from '@store/features/call-status/call-status-slice';

type ActionButtonsProps = {
  smallFeedEl: RefObject<HTMLVideoElement>;
};

/* eslint-disable @typescript-eslint/no-unused-vars */
const ActionButtons = ({ smallFeedEl }: ActionButtonsProps) => {
  const callStatus = useAppSelector((state) => state.callStatus);
  const dispatch = useAppDispatch();

  const menuButtons = useRef(null);

  const audioBtnHandler = () => {
    dispatch(updateCallStatus({ audio: !callStatus.audio }));
  };

  const videoBtnHandler = () => {
    dispatch(updateCallStatus({ video: !callStatus.video }));
  };

  return (
    <div className="flex bg-rose-500 h-14 w-24 rounded-md">
      <button
        onClick={audioBtnHandler}
        className="audioBtnContainer flex flex-grow  items-center justify-center hover:bg-rose-300 hover:rounded-l-md"
      >
        {callStatus.audio ? (
          <MicOff className="text-rose-900" />
        ) : (
          <Mic className="text-rose-900" />
        )}
      </button>
      <div className="w-0 h-full flex border-r-2 border-rose-900"></div>
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
    </div>
  );
};

export default ActionButtons;
