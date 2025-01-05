import { updateCallStatus } from '@store/features/call-status/call-status-slice';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { Mic, MicOff } from 'lucide-react';
import { FC } from 'react';

const AudioButton: FC = () => {
  const callStatus = useAppSelector((state) => state.callStatus);
  const dispatch = useAppDispatch();

  const audioBtnHandler = () => {
    if (callStatus.audio == 'enabled') {
      dispatch(updateCallStatus({ audio: 'disabled' }));
      return;
    } else if (callStatus.audio == 'disabled') {
      dispatch(updateCallStatus({ audio: 'enabled' }));
      return;
    }
  };
  return (
    <>
      <button
        onClick={audioBtnHandler}
        className={`audionBtnContainer flex flex-grow items-center justify-center  hover:rounded-l-md ${callStatus.audio == 'disabled' ? 'bg-rose-300 hover:bg-rose-400' : 'bg-green-300 hover:bg-green-400'} rounded-l-md`}
      >
        {callStatus.audio == 'enabled' ? (
          <Mic className="text-gray-900" />
        ) : (
          <MicOff className="text-gray-900" />
        )}
      </button>
    </>
  );
};

export default AudioButton;
