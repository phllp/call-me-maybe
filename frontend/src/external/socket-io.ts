import { io, Socket } from 'socket.io-client';

let socket: Socket | null = null;

const socketConnection = (jwt: unknown) => {
  if (socket) {
    return socket;
  }
  const apiUrl = import.meta.env.VITE_API_HOST || 'https://localhost:3000';
  socket = io(apiUrl, { auth: { jwt } });

  socket.on('connect', () => {
    console.log('connected to server');
  });

  socket.on('disconnect', () => {
    console.log('disconnected from server');
  });
  return socket;
};

export default socketConnection;
