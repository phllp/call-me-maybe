type DevicesAvailable = {
  videoDevices: MediaDeviceInfo[];
  audioInputDevices: MediaDeviceInfo[];
  audioOutputDevices: MediaDeviceInfo[];
};

export const getDevices = () => {
  return new Promise<DevicesAvailable>(async (resolve, reject) => {
    const devices = await navigator.mediaDevices.enumerateDevices();

    const videoDevices = devices.filter((d) => d.kind === 'videoinput');
    const audioInputDevices = devices.filter((d) => d.kind === 'audioinput');
    const audioOutputDevices = devices.filter((d) => d.kind === 'audiooutput');

    console.log('Devices:', devices);

    resolve({
      videoDevices,
      audioInputDevices,
      audioOutputDevices,
    } as DevicesAvailable);
  });
};

export default getDevices;
