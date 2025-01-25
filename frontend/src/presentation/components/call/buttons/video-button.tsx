import { useAppDispatch, useAppSelector } from '@store/hooks';
import { Video, VideoOff } from 'lucide-react';
import { FC, RefObject, useEffect, useState } from 'react';
import startLocalVideoStream from './startLocalVideoStream';
import { updateCallStatus } from '@store/features/call-status/call-status-slice';
import { getDevices } from '@utils/get-devices';
import { addStream } from '@store/features/streams/streams-slice';
import VideoDevicesDropdown from './video-devices-dropdown';

type VideoButtonProps = {
  localVideoEl: RefObject<HTMLVideoElement>;
};

const VideoButton: FC<VideoButtonProps> = ({ localVideoEl }) => {
  const callStatus = useAppSelector((state) => state.callStatus);
  const streams = useAppSelector((state) => state.streams);
  const dispatch = useAppDispatch();

  const [pendingUpdate, setPendingUpdate] = useState(false);
  const [videoDevices, setVideoDevices] = useState<MediaDeviceInfo[]>([]);

  const [selectedDevice, setSelectedDevice] = useState<string>('');
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const videoBtnHandler = () => {
    if (!localVideoEl.current) {
      console.error('Video Button: local video element not found');
      return;
    }
    const localStream = streams.find((stream) => stream.who == 'localStream');
    const tracks = localStream?.stream.getVideoTracks();

    if (callStatus.video == 'enabled') {
      /** If the video is enabled, disable it  */
      dispatch(updateCallStatus({ video: 'disabled' }));
      /** Disables the video tracks */
      tracks?.forEach((track) => (track.enabled = false));
    } else if (callStatus.video == 'disabled') {
      /** If the video is disabled, enable it */
      dispatch(updateCallStatus({ video: 'enabled' }));
      /** Enables the video tracks */
      tracks?.forEach((track) => (track.enabled = true));
    } else if (callStatus.haveMedia) {
      /** The button was clicked and  */

      localVideoEl.current.srcObject = localStream!.stream;
      startLocalVideoStream(streams, dispatch);
    } else {
      /** The button was clicked, but media access not granted yet */
      setPendingUpdate(true);
    }
  };

  /**
   * Runs when the media access was granted, making sure that the MediaStream
   * will be added to our video feed
   */
  useEffect(() => {
    if (pendingUpdate && callStatus.haveMedia) {
      if (!localVideoEl.current) {
        console.error('Video Button: local video element not found');
        return;
      }
      setPendingUpdate(false);
      const localStream = streams.find((stream) => stream.who == 'localStream');
      localVideoEl.current.srcObject = localStream!.stream;
    }
  }, [callStatus.haveMedia, localVideoEl, pendingUpdate, streams]);

  /**
   * Updates the devices list when the dropdown is opened
   */
  useEffect(() => {
    if (dropdownOpen) {
      const getDevicesAsync = async () => {
        const devices = await getDevices();
        setVideoDevices(devices.videoDevices);
      };

      getDevicesAsync();
    }
  }, [dropdownOpen]);

  const changeVideoDevice = async () => {
    try {
      // Asking again for permissions
      const newConstraints = {
        audio:
          callStatus.audioDevice === 'default'
            ? true
            : { deviceId: { exact: callStatus.audioDevice } },
        video: { deviceId: { exact: selectedDevice } },
      };

      const stream = await navigator.mediaDevices.getUserMedia(newConstraints);
      dispatch(updateCallStatus({ videoDevice: selectedDevice }));
      localVideoEl.current!.srcObject = stream;
      dispatch(addStream({ stream, who: 'localStream' }));
      dispatch(updateCallStatus({ video: 'enabled' }));
      // todo come back to this later
      // const tracks = stream.getVideoTracks();
    } catch (error) {
      console.error(`Error changing video device: ${error}`);
    }
  };

  return (
    <div className="flex flex-grow relative">
      <button
        onClick={videoBtnHandler}
        className={`flex items-center justify-center h-full w-full hover:rounded-r-md ${
          callStatus.video !== 'enabled'
            ? 'bg-rose-300 hover:bg-rose-400'
            : 'bg-green-300 hover:bg-green-400'
        } rounded-r-md`}
      >
        {callStatus.video === 'enabled' ? (
          <Video className="text-gray-900" />
        ) : (
          <VideoOff className="text-gray-900" />
        )}
      </button>
      <div className="absolute -top-2 right-0">
        <VideoDevicesDropdown
          devices={videoDevices}
          selectedDevice={selectedDevice}
          setSelectedDevice={setSelectedDevice}
          setDropdownOpen={() => setDropdownOpen(!dropdownOpen)}
          changeVideoDevice={changeVideoDevice}
        />
      </div>
    </div>
  );
};

export default VideoButton;
