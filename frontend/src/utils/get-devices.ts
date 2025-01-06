type DevicesAvailable = {
  videoDevices: MediaDeviceInfo[];
  audioInputDevices: MediaDeviceInfo[];
  audioOutputDevices: MediaDeviceInfo[];
};

export const getDevices = () => {
  return new Promise<DevicesAvailable>(async (resolve, reject) => {
    const devices = await navigator.mediaDevices.enumerateDevices();

    const videoDevices = devices.filter(
      (device) => device.kind === 'videoinput'
    );
    const audioInputDevices = devices.filter(
      (device) => device.kind === 'audioinput'
    );
    const audioOutputDevices = devices.filter(
      (device) => device.kind === 'audiooutput'
    );

    resolve({
      videoDevices,
      audioInputDevices,
      audioOutputDevices,
    } as DevicesAvailable);
  });
};
