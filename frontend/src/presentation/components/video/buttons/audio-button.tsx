import DeviceSelection from '@components/device-selection-dropdown';
import { updateCallStatus } from '@store/features/call-status/call-status-slice';
import { addStream } from '@store/features/streams/streams-slice';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import getDevices from '@utils/get-devices';
import { Mic, MicOff } from 'lucide-react';
import { FC, RefObject, useEffect, useState } from 'react';
import startAudioStream from './startAudioStream';

type AudioButtonProps = {
  localVideoEl: RefObject<HTMLVideoElement>;
};

const AudioButton: FC<AudioButtonProps> = ({ localVideoEl }) => {
  const callStatus = useAppSelector((state) => state.callStatus);
  const streams = useAppSelector((state) => state.streams);
  const dispatch = useAppDispatch();

  const [pendingUpdate, setPendingUpdate] = useState(false);
  const [audioDevices, setAudioDevices] = useState<MediaDeviceInfo[]>([]);

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const changeAudioDevice = async (id: string) => {
    const deviceId = id.slice(5); // Removes 'input' or 'output' from the id
    const audioType = id.slice(0, 5); // Gets 'input' or 'output' from the id
    console.log('changeAudioDevice', deviceId, audioType);

    if (audioType === 'output') {
      localVideoEl.current?.setSinkId(deviceId);
    } else if (audioType === 'input') {
      // Asking again for permissions
      const newConstraints = {
        audio: { deviceId: { exact: deviceId } },
        video:
          callStatus.videoDevice === 'default'
            ? true
            : { deviceId: { exact: callStatus.videoDevice } },
      };

      const stream = await navigator.mediaDevices.getUserMedia(newConstraints);
      dispatch(updateCallStatus({ audioDevice: deviceId }));
      localVideoEl.current!.srcObject = stream;
      dispatch(addStream({ stream, who: 'localStream' }));
      dispatch(updateCallStatus({ audio: 'enabled' }));
      const tracks = stream.getAudioTracks();
    } else {
      console.error('AudioButton: Invalid audio type');
    }
  };

  const audioBtnHandler = () => {
    if (!localVideoEl.current) {
      console.error('Audio Button: local video element not found');
      return;
    }
    const localStream = streams.find((stream) => stream.who == 'localStream');
    const tracks = localStream?.stream.getAudioTracks();
    if (callStatus.audio == 'enabled') {
      dispatch(updateCallStatus({ audio: 'disabled' }));
      /** Disables the audio tracks */
      tracks?.forEach((track) => (track.enabled = false));
      return;
    } else if (callStatus.audio == 'disabled') {
      dispatch(updateCallStatus({ audio: 'enabled' }));
      /** Enables the audio tracks */
      tracks?.forEach((track) => (track.enabled = true));
      return;
    } else {
      // Audio is off
      changeAudioDevice('inputdefault');
      startAudioStream(streams);
    }
  };

  useEffect(() => {
    if (dropdownOpen) {
      const getDevicesAsync = async () => {
        const devices = await getDevices();
        setAudioDevices(
          devices.audioOutputDevices.concat(devices.audioInputDevices)
        );
      };

      getDevicesAsync();
    }
  }, [dropdownOpen]);

  return (
    <>
      <div className="flex flex-grow relative">
        <button
          onClick={audioBtnHandler}
          className={`flex items-center justify-center h-full w-full hover:rounded-l-md ${
            callStatus.audio !== 'enabled'
              ? 'bg-rose-300 hover:bg-rose-400'
              : 'bg-green-300 hover:bg-green-400'
          } rounded-l-md`}
        >
          {callStatus.audio === 'enabled' ? (
            <Mic className="text-gray-900" />
          ) : (
            <MicOff className="text-gray-900" />
          )}
        </button>
        <div className="absolute -top-2 right-0">
          <DeviceSelection
            devices={audioDevices}
            onSelect={changeAudioDevice}
            setIsOpen={setDropdownOpen}
            deviceType="audio"
          />
        </div>
      </div>
    </>
  );
};

export default AudioButton;
