import { FC, useState } from 'react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { ChevronUp, CircleCheck } from 'lucide-react';

type DeviceItemProps = {
  device: MediaDeviceInfo;
  selected: string;
  onSelect: () => void;
  setSelected: (deviceId: string) => void;
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

type DeviceSelectionProps = {
  devices: MediaDeviceInfo[];
  onSelect: (deviceId: string) => void;
  label?: string;
  setIsOpen?: (isOpen: boolean) => void;
  deviceType: 'video' | 'audio';
};

const DeviceSelection: FC<DeviceSelectionProps> = ({
  devices,
  label,
  onSelect,
  setIsOpen,
  deviceType,
}) => {
  const [selected, setSelected] = useState(devices[0]?.deviceId);
  const handleOpenChange = (open: boolean) => {
    if (setIsOpen) {
      setIsOpen(open);
    }
  };
  let dropdownEl;
  if (deviceType === 'video') {
    dropdownEl = devices.map((device) => (
      <DeviceItem
        device={device}
        onSelect={() => {
          onSelect(device.deviceId);
          setSelected(device.deviceId);
        }}
        selected={selected}
        setSelected={setSelected}
      />
    ));
  } else if (deviceType === 'audio') {
    const audioInputEl = [];
    const audioOutputEl = [];

    devices.forEach((d) => {
      if (d.kind == 'audioinput') {
        audioInputEl.push(
          <DeviceItem
            key={`input${d.deviceId}`}
            device={d}
            onSelect={() => {
              onSelect(`input${d.deviceId}`);
              setSelected(d.deviceId);
            }}
            selected={selected}
            setSelected={setSelected}
          />
        );
      } else if (d.kind == 'audiooutput') {
        audioOutputEl.push(
          <DeviceItem
            key={`output${d.deviceId}`}
            device={d}
            onSelect={() => {
              onSelect(`output${d.deviceId}`);
              setSelected(d.deviceId);
            }}
            selected={selected}
            setSelected={setSelected}
          />
        );
      }
    });
    audioInputEl.unshift(
      <DropdownMenu.Label className="ml-2 cursor-default text-gray-700">
        Input
      </DropdownMenu.Label>
    );

    audioOutputEl.unshift(
      <DropdownMenu.Label className="ml-2 cursor-default mt-2 text-gray-700">
        Output
      </DropdownMenu.Label>
    );

    dropdownEl = audioInputEl.concat(audioOutputEl);
  }

  return (
    <DropdownMenu.Root onOpenChange={handleOpenChange}>
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
            disabled
            className="px-4 py-2 text-gray-400 cursor-not-allowed"
          >
            Nenhum dispositivo disponível
          </DropdownMenu.Item>
        ) : (
          dropdownEl
        )}
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
};

export default DeviceSelection;
