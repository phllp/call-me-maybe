import { FC } from 'react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { ChevronUp, CircleCheck } from 'lucide-react';

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

type VideoDevicesDropdownProps = {
  devices: MediaDeviceInfo[];
  selectedDevice: string;
  setSelectedDevice: (deviceId: string) => void;
  setDropdownOpen: () => void;
  changeVideoDevice: (deviceId: string) => void;
};

const VideoDevicesDropdown: FC<VideoDevicesDropdownProps> = ({
  devices,
  selectedDevice,
  setSelectedDevice,
  setDropdownOpen,
  changeVideoDevice,
}) => {
  console.log(devices);
  return (
    <DropdownMenu.Root onOpenChange={setDropdownOpen}>
      <DropdownMenu.Trigger className="px-1 py-1 bg-gray-300  border border-gray-500 rounded-md shadow-sm hover:bg-gray-600 text-gray-800 hover:text-gray-50 focus:outline-none  ">
        {/* {label} */}
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
            Video devices not found
          </DropdownMenu.Item>
        ) : (
          devices.map((d) => (
            <DeviceItem
              key={d.deviceId}
              device={d}
              onSelect={() => {
                setSelectedDevice(d.deviceId);
                changeVideoDevice(d.deviceId);
              }}
              selected={selectedDevice}
            />
          ))
        )}
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
};

export default VideoDevicesDropdown;
