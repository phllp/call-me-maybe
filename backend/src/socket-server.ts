import { Server as SocketIOServer } from 'socket.io';

export default (httpsServer: any, app: any) => {
  const io = new SocketIOServer(httpsServer, {
    cors: {
      origin: ['https://localhost:5173'],
      methods: ['GET', 'POST'],
    },
  });

  io.on('connection', (socket) => {
    console.log(`:: Socket Connected ${socket.id} ::`);
  });
};
