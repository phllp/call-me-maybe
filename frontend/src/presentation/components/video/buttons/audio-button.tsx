import { updateCallStatus } from '@store/features/call-status/call-status-slice';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { Mic, MicOff } from 'lucide-react';
import { FC } from 'react';

const AudioButton: FC = () => {
  const callStatus = useAppSelector((state) => state.callStatus);
  const dispatch = useAppDispatch();

  const audioBtnHandler = () => {
    dispatch(updateCallStatus({ audio: !callStatus.audio }));
  };
  return (
    <>
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
    </>
  );
};

export default AudioButton;
