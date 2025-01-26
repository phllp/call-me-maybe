import { FC } from 'react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { ChevronUp, CircleCheck } from 'lucide-react';

export enum AudioDeviceTypes {
  INPUT = 'input',
  OUTPUT = 'outpt',
}

type DeviceItemProps = {
  device: MediaDeviceInfo;
  selected: string;
  onSelect: () => void;
};

const DeviceItem: FC<DeviceItemProps> = ({ device, onSelect, selected }) => {
  return (
    <DropdownMenu.Item
      key={device.deviceId}
      onSelect={onSelect}
      className="flex flex-grow pl-4 cursor-pointer hover:bg-gray-200 focus:outline-none w-full items-center justify-between"
    >
      <span className="text-gray-900">{device.label}</span>
      {selected === device.deviceId ? (
        <CircleCheck className="h-4 ml-3 mr-1" />
      ) : (
        <></>
      )}
    </DropdownMenu.Item>
  );
};

type AudioDevicesDropdownProps = {
  devices: MediaDeviceInfo[];
  selectedInput: string;
  setSelectedInput: (deviceId: string) => void;
  selectedOutput: string;
  setSelectedOutput: (deviceId: string) => void;
  setDropdownOpen: () => void;
  changeAudioDevice: (deviceId: string) => void;
};

const AudioDevicesDropdown: FC<AudioDevicesDropdownProps> = ({
  devices,
  selectedInput,
  setSelectedInput,
  selectedOutput,
  setSelectedOutput,
  setDropdownOpen,
  changeAudioDevice,
}) => {
  const audioInputEl = [];
  const audioOutputEl = [];

  devices.forEach((d) => {
    if (d.kind == 'audioinput') {
      audioInputEl.push(
        <DeviceItem
          key={`input${d.deviceId}`}
          device={d}
          onSelect={() => {
            changeHandler(`input${d.deviceId}`);
          }}
          selected={selectedInput}
        />
      );
    } else if (d.kind == 'audiooutput') {
      audioOutputEl.push(
        <DeviceItem
          key={`outpt${d.deviceId}`}
          device={d}
          onSelect={() => {
            changeHandler(`outpt${d.deviceId}`);
          }}
          selected={selectedOutput}
        />
      );
    }
  });
  audioInputEl.unshift(
    <DropdownMenu.Label
      key="input"
      className="ml-2 cursor-default text-gray-700"
    >
      Input
    </DropdownMenu.Label>
  );

  audioOutputEl.unshift(
    <DropdownMenu.Label
      key="output"
      className="ml-2 cursor-default mt-2 text-gray-700"
    >
      Output
    </DropdownMenu.Label>
  );

  const dropdownEl = audioInputEl.concat(audioOutputEl);

  /**
   * Updates the selected input/output device.
   * Calls the callback function onSelect with the deviceId.
   * @param event
   */
  const changeHandler = (deviceId: string) => {
    const deviceType = deviceId.slice(0, 5);
    const rawDevideId = deviceId.slice(5);
    if (deviceType === AudioDeviceTypes.INPUT) {
      setSelectedInput(rawDevideId);
      changeAudioDevice(rawDevideId);
    } else {
      setSelectedOutput(rawDevideId);
      changeAudioDevice(rawDevideId);
    }
  };

  return (
    <DropdownMenu.Root onOpenChange={setDropdownOpen}>
      <DropdownMenu.Trigger className="px-1 py-1 bg-gray-300  border border-gray-500 rounded-md shadow-sm hover:bg-gray-600 text-gray-800 hover:text-gray-50 focus:outline-none  ">
        <ChevronUp className="w-3 h-3 cursor-pointer" />
      </DropdownMenu.Trigger>
      <DropdownMenu.Content
        className="mt-2  bg-gray-100 border border-gray-200 rounded-md shadow-lg"
        side="top"
        align="center"
        sideOffset={5}
      >
        {devices.length === 0 ? (
          <DropdownMenu.Item
            key={'no-devices'}
            disabled
            className="px-4 py-2 text-gray-400 cursor-not-allowed"
          >
            Audio devices not found
          </DropdownMenu.Item>
        ) : (
          dropdownEl
        )}
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
};

export default AudioDevicesDropdown;
