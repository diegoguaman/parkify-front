import { io, Socket } from 'socket.io-client'

// Cambiar por la URL real del backend

let socket: Socket | null = null

export const getSocket = (): Socket | null => {
  // Imprimir la variable de entorno para VITE_SOCKET_ENABLED
  console.log('VITE_SOCKET_ENABLED:', import.meta.env.VITE_SOCKET_ENABLED);
  
  // Asegurarnos de que estamos comparando correctamente el valor
  const isSocketEnabled = import.meta.env.VITE_SOCKET_ENABLED === 'true';

  // Imprimir si el socket está habilitado
  console.log('Is WebSocket enabled?', isSocketEnabled);

  if (!isSocketEnabled) {
    console.warn('WebSocket connection disabled by environment configuration.');
    return null;
  }

  // Si el socket aún no está instanciado, intentamos crearlo
  if (!socket) {
    try {
      console.log('Trying to connect to socket with URL:', import.meta.env.VITE_API_URL);
      socket = io(import.meta.env.VITE_API_URL, {
        autoConnect: false,
        transports: ['websocket'],
      });
    } catch (error) {
      console.error('Error connecting to WebSocket:', error);
      socket = null;
    }
  }

  // Devuelvo el socket
  return socket;
}
