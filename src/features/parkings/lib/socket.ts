

import { io, Socket } from 'socket.io-client';

let socket: Socket | null = null;

export const getSocket = (): Socket | null => {
  const rawSocketFlag = import.meta.env.VITE_SOCKET_ENABLED;
  const rawApiUrl = import.meta.env.VITE_API_URL;

  console.log('VITE_SOCKET_ENABLED:', rawSocketFlag);
  console.log('VITE_API_URL:', rawApiUrl);

  const isSocketEnabled = rawSocketFlag?.toLowerCase() === 'true';

  console.log('Is WebSocket enabled?', isSocketEnabled);

  if (!isSocketEnabled) {
    console.warn('WebSocket connection disabled by environment configuration.');
    return null;
  }

  if (!socket) {
    try {
      // Asegurarse que la URL tenga el protocolo http:// o https://
      let apiUrl = rawApiUrl;
      if (!apiUrl.startsWith('http://') && !apiUrl.startsWith('https://')) {
        apiUrl = `http://${apiUrl}`;
        console.log('No protocol in API URL, defaulting to:', apiUrl);
      }

      // Añadir el puerto :8080 al final de la URL si no está presente
      if (!apiUrl.includes(':8080')) {
        apiUrl = apiUrl.endsWith('/') ? `${apiUrl}8080` : `${apiUrl}:8080`;
        console.log('Appending port 8080, new URL:', apiUrl);
      }

      console.log('Connecting to WebSocket at URL:', apiUrl);
      socket = io(apiUrl, {
        autoConnect: false,
        transports: ['websocket'],
      });
    } catch (error) {
      console.error('Error connecting to WebSocket:', error);
      socket = null;
    }
  }

  return socket;
};
