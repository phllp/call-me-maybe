import ActionButtons from '@components/call/action-buttons';
import VideoPlayer from '@components/call/video-player';
import { updateCallStatus } from '@store/features/call-status/call-status-slice';
import { addStream } from '@store/features/streams/streams-slice';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { useEffect, useRef, useState } from 'react';
import { useSocket } from '../hooks/useSocket';
import { useSearchParams } from 'react-router-dom';
import { Session } from '@core/entities/session';
import api from '@external/axios';
import createPeerConnection from '@external/socket.io/create-peer-connection';
import InviteLink from '@components/invitation-link-modal';

const Video: React.FC = () => {
  const [searchParams] = useSearchParams();

  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);
  const streams = useAppSelector((state) => state.streams);
  const callStatus = useAppSelector((state) => state.callStatus);

  const { emit, isConnected } = useSocket({
    options: { auth: { hostId: user.id } },
  });

  const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [callMetadata, setCallMetadata] = useState<Session>();

  const smallFeedEl = useRef<HTMLVideoElement>(null);
  const largeFeedEl = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const fetchToken = async () => {
      const token = searchParams.get('token');
      const validatedToken = await api.post('/validate-token', { token });
      const tokenData: Session = validatedToken.data;
      setCallMetadata(tokenData);
    };
    fetchToken();
  }, []);

  useEffect(() => {
    const newOfferAsync = async () => {
      console.log('streams:', streams);
      streams.forEach(async (s) => {
        if (s.who !== 'localStream') {
          try {
            const pc = s.peerConnection;
            const offer = await pc?.createOffer();
            pc?.setLocalDescription(offer);

            if (isConnected && callMetadata) {
              console.log('emitting new offer');
              emit('newOffer', { metadata: callMetadata, offer });
            } else {
              console.error(
                'Error creating offer. Socket Connected:',
                isConnected,
                'Call Metadata:',
                callMetadata
              );
            }
          } catch (error) {
            console.error('Error creating offer:', error);
          }
        }
      });
      dispatch(updateCallStatus({ haveCreatedOffer: true }));
    };

    const audioEnabled = callStatus.audio == 'enabled';
    const videoEnabled = callStatus.video == 'enabled';
    const haveCreatedOffer = callStatus.haveCreatedOffer;

    if (videoEnabled && audioEnabled && !haveCreatedOffer) {
      console.info('creating offer');
      newOfferAsync();
    }
  }, [
    callStatus.audio,
    callStatus.haveCreatedOffer,
    callStatus.video,
    dispatch,
    emit,
    isConnected,
    searchParams,
    streams,
  ]);

  useEffect(() => {
    const fetchMedia = async () => {
      const constraints = {
        audio: true,
        video: true,
      };

      try {
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        dispatch(addStream({ who: 'localStream', stream }));
        dispatch(updateCallStatus({ haveMedia: true }));
        setLocalStream(stream);

        // adds the default audio and video devices to the redux state
        stream.getTracks().forEach((track) => {
          const settings = track.getSettings();
          const deviceId = settings.deviceId;

          if (track.kind === 'audio') {
            dispatch(updateCallStatus({ audioDevice: deviceId }));
          } else if (track.kind === 'video') {
            dispatch(updateCallStatus({ videoDevice: deviceId }));
          }
        });

        const { peerConnection, remoteStream } =
          await createPeerConnection(addIce);
        setRemoteStream(remoteStream);
        dispatch(
          addStream({
            who: 'remote1',
            stream: remoteStream,
            peerConnection: peerConnection,
          })
        );
      } catch (error) {
        console.error(`Error fetching user media: ${error}`);
      }
    };
    fetchMedia();
  }, []);

  const addIce = (iceC: RTCIceCandidate) => {
    // Todo...
    console.log(iceC);
  };

  return (
    <div className="flex flex-grow w-full h-full items-center justify-center flex-col">
      <div className="w-7/12 mb-8">
        <VideoPlayer
          localStream={localStream}
          remoteStream={remoteStream}
          localVideoRef={smallFeedEl}
          remoteVideoRef={largeFeedEl}
        />
      </div>
      <div className="flex flex-row gap-4">
        <ActionButtons localVideoEl={smallFeedEl} />
        <InviteLink callMetadata={callMetadata} />
      </div>
    </div>
  );
};

export default Video;
