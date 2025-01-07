import { useEffect, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client';

type UseSocketOptions = {
  jwt?: unknown;
};

const useSocket = ({ jwt }: UseSocketOptions) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    if (!socketRef.current) {
      const apiUrl = import.meta.env.VITE_API_HOST || 'http://localhost:9000';
      const newSocket = io(apiUrl, { auth: { jwt } });

      newSocket.on('connect', () => {
        console.log('connected to server');
      });

      newSocket.on('disconnect', () => {
        console.log('disconnected from server');
      });

      socketRef.current = newSocket;
      setSocket(newSocket);
    }

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current = null;
        setSocket(null);
      }
    };
  }, [jwt]);

  return socket;
};

export default useSocket;
