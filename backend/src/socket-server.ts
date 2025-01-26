import { Socket, Server as SocketIOServer } from 'socket.io';

enum ConnType {
  HOST = 'HOST',
  GUEST = 'GUEST',
}

type SocketUser = {
  userId: string;
  socketId: string;
};

let connectedHostSockets: SocketUser[] = [];
let connectedGuestSockets: SocketUser[] = [];

/**
 * Adds the host to the connected sockets list, or update it's ID
 * in case of reconnection
 */
const handleHostConnection = (hostId: string, socketId: string) => {
  const existingHostSocket = connectedHostSockets.find(
    (s) => s.userId === hostId
  );

  if (!existingHostSocket) {
    // New host connected for the first time
    connectedHostSockets.push({ userId: hostId, socketId });
    console.info(`[socket.io] Host connected { hostId : ${hostId} }`);
  } else {
    // Updates the socket ID of an existing host
    existingHostSocket.socketId = socketId;
    console.info(`[socket.io] Host reconnected { hostId : "${hostId}" }`);
  }
};

/**
 * Adds the guest to the connected sockets list, or update it's ID
 * in case of reconnection
 */
const handleGuestConnection = (guestId: string, socketId: string) => {
  const existingGuestSocket = connectedGuestSockets.find(
    (s) => s.userId === guestId
  );

  if (!existingGuestSocket) {
    // New guest connected for the first time
    connectedHostSockets.push({ userId: guestId, socketId });
    console.info(`[socket.io] Guest connected { guestId : ${guestId} }`);
  } else {
    // Updates the socket ID of an existing guest
    existingGuestSocket.socketId = socketId;
    console.info(`[socket.io] Guest reconnected { guestId : "${guestId}" }`);
  }
};

const handleConnection = (socket: Socket, hostId: string, guestId: string) => {
  if (!hostId && !guestId) {
    console.error('[socket.io] Neither hostId nor guestId provided');
    return false;
  }
  const socketId = socket.id;

  const connectionType = guestId ? ConnType.GUEST : ConnType.HOST;

  if (connectionType === ConnType.GUEST) {
    handleGuestConnection(guestId, socketId);
  } else if (connectionType === ConnType.HOST) {
    handleHostConnection(hostId, socketId);
  } else {
    console.error('[socket.io] Unrecognized connection origin.');
  }
  return connectionType;
};

export default (server: any, app: any) => {
  const io = new SocketIOServer(server, {
    cors: {
      origin: ['http://localhost:5173'],
      methods: ['GET', 'POST'],
    },
  });

  io.on('connection', (socket) => {
    console.log(`:: Socket Connected ${socket.id} ::`);
    const hostId = socket.handshake.auth.hostId as string;
    const guestId = socket.handshake.auth.guestId as string;

    const connType = handleConnection(socket, hostId, guestId);

    if (!connType) {
      console.warn('[socket.io] Early disconnection');
      socket.disconnect(true);
      return;
    }

    socket.on(
      'newOffer',
      ({ hostId: string, offer: RTCSessionDescription }) => {
        console.log('New Offer Received:', hostId);
      }
    );
  });
};
