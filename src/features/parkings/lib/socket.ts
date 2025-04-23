import { io, Socket } from 'socket.io-client';

let socket: Socket | null = null;

export const getSocket = (): Socket | null => {
  const isSocketEnabled = import.meta.env.VITE_SOCKET_ENABLED?.toLowerCase() === 'true';
  const apiUrl = import.meta.env.VITE_API_URL;

  console.log('VITE_SOCKET_ENABLED:', import.meta.env.VITE_SOCKET_ENABLED);
  console.log('VITE_API_URL:', apiUrl);
  console.log('Is WebSocket enabled?', isSocketEnabled);

  if (!isSocketEnabled) {
    console.warn('WebSocket connection disabled by environment configuration.');
    return null;
  }

  if (!socket) {
    console.log('Connecting to WebSocket at URL:', apiUrl);
    socket = io(apiUrl, {
      autoConnect: false,
      transports: ['websocket'],
    });
  }

  return socket;
};
