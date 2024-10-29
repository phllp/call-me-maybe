import { updateCallStatus } from '@store/features/call-status/call-status-slice';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { Video, VideoOff } from 'lucide-react';
import { FC } from 'react';

const VideoButton: FC = () => {
  const callStatus = useAppSelector((state) => state.callStatus);
  const dispatch = useAppDispatch();

  const videoBtnHandler = () => {
    dispatch(updateCallStatus({ video: !callStatus.video }));
  };
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
