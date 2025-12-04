import { useEffect, useRef } from 'react';
import { io } from 'socket.io-client';

export function useSocket(userId, onEvents = {}) {
  const socketRef = useRef(null);

  useEffect(() => {
    if (!userId) return;
    socketRef.current = io(import.meta.env.VITE_WS_URL, { query: { userId } });

    const socket = socketRef.current;
    Object.entries(onEvents).forEach(([event, handler]) => socket.on(event, handler));

    return () => {
      Object.entries(onEvents).forEach(([event, handler]) => socket.off(event, handler));
      socket.disconnect();
    };
  }, [userId]);

  return socketRef.current;
}
