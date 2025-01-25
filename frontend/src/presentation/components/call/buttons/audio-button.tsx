import { updateCallStatus } from '@store/features/call-status/call-status-slice';
import { addStream } from '@store/features/streams/streams-slice';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import getDevices from '@utils/get-devices';
import { Mic, MicOff } from 'lucide-react';
import { FC, RefObject, useEffect, useState } from 'react';
import startAudioStream from './startAudioStream';
import AudioDevicesDropdown from './audio-devices-dropdown'; // AudioDeviceTypes,

type AudioButtonProps = {
  localVideoEl: RefObject<HTMLVideoElement>;
};

const AudioButton: FC<AudioButtonProps> = ({ localVideoEl }) => {
  const callStatus = useAppSelector((state) => state.callStatus);
  const streams = useAppSelector((state) => state.streams);
  const dispatch = useAppDispatch();

  const [audioDevices, setAudioDevices] = useState<MediaDeviceInfo[]>([]);

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedInput, setSelectedInput] = useState('default');
  const [selectedOutput, setSelectedOutput] = useState('default');

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
      // changeAudioDevice(AudioDeviceTypes.INPUT);
      console.log('should happen here');
      changeAudioDevice();
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

  const changeAudioDevice = async () => {
    try {
      // Updates audio output
      localVideoEl.current?.setSinkId(selectedOutput);

      // Updates audio input
      const newConstraints = {
        audio: { deviceId: { exact: selectedInput } },
        video:
          callStatus.videoDevice === 'default'
            ? true
            : { deviceId: { exact: callStatus.videoDevice } },
      };

      const stream = await navigator.mediaDevices.getUserMedia(newConstraints);

      dispatch(addStream({ stream, who: 'localStream' }));
      dispatch(updateCallStatus({ audioDevice: selectedInput }));
      dispatch(updateCallStatus({ audio: 'enabled' }));

      // todo come back to this later
      // const tracks = stream.getAudioTracks();
      // } else {
      //   console.error('AudioButton: Invalid audio type');
      // }
    } catch (error) {
      console.error(`Error changing audio device: ${error}`);
    }
  };

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
          <AudioDevicesDropdown
            devices={audioDevices}
            // onSelect={changeAudioDevice}
            setDropdownOpen={() => setDropdownOpen(!dropdownOpen)}
            selectedInput={selectedInput}
            setSelectedInput={setSelectedInput}
            selectedOutput={selectedOutput}
            setSelectedOutput={setSelectedOutput}
            changeAudioDevice={changeAudioDevice}
          />
        </div>
      </div>
    </>
  );
};

export default AudioButton;
