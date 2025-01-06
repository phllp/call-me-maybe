import { FC } from 'react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { ChevronUp, CircleCheck } from 'lucide-react';

type DeviceSelectionProps = {
  selectedDeviceId: string | null;
  devices: MediaDeviceInfo[];
  onSelect: (deviceId: string) => void;
  label?: string;
};

const DeviceSelection: FC<DeviceSelectionProps> = ({
  devices,
  selectedDeviceId,
  label,
  onSelect,
}) => {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger className="px-1 py-1 bg-gray-300  border border-gray-500 rounded-md shadow-sm hover:bg-gray-600 text-gray-800 hover:text-gray-50 focus:outline-none  ">
        {/* {label} */}
        <ChevronUp className="w-3 h-3 cursor-pointer" />
      </DropdownMenu.Trigger>
      <DropdownMenu.Content
        className="mt-2  bg-white border border-gray-200 rounded-md shadow-lg"
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
          devices.map((device) => (
            <DropdownMenu.Item
              key={device.deviceId}
              onSelect={() => onSelect(device.deviceId)}
              className="flex flex-grow pl-4 cursor-pointer hover:bg-blue-100 focus:bg-blue-200 focus:outline-none w-full items-center justify-between"
            >
              <span>{device.label}</span>
              {selectedDeviceId === device.deviceId ? (
                <CircleCheck className="h-4 ml-3 mr-1" />
              ) : (
                <></>
              )}
            </DropdownMenu.Item>
          ))
        )}
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
};

export default DeviceSelection;
