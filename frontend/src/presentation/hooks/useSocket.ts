import { useEffect, useState, useCallback, useRef } from 'react';
import { io, Socket } from 'socket.io-client';

interface UseSocketOptions {
  options?: Parameters<typeof io>[1];
}

export const useSocket = ({ options }: UseSocketOptions) => {
  const [isConnected, setIsConnected] = useState(false);
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    const url = import.meta.env.VITE_API_HOST;
    const socket = io(url, options);
    socketRef.current = socket;

    socket.on('connect', () => {
      setIsConnected(true);
      console.log('Socket connected:', socket.id);
    });

    socket.on('disconnect', () => {
      setIsConnected(false);
      console.log('Socket disconnected');
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const emit = useCallback((event: string, ...args: unknown[]) => {
    if (socketRef.current) {
      socketRef.current.emit(event, ...args);
    }
  }, []);

  const on = useCallback(
    (event: string, handler: (...args: unknown[]) => void) => {
      if (socketRef.current) {
        socketRef.current.on(event, handler);
      }
    },
    []
  );

  const off = useCallback(
    (event: string, handler?: (...args: unknown[]) => void) => {
      if (socketRef.current) {
        if (handler) {
          socketRef.current.off(event, handler);
        } else {
          socketRef.current.off(event);
        }
      }
    },
    []
  );

  return { socket: socketRef.current, isConnected, emit, on, off };
};
