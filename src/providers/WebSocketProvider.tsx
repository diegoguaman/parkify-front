import { useEffect } from 'react';
import { useWebSocket } from '../hooks/useWebSocket';

type Props = {
  children: React.ReactNode;
};

/**
 * WebSocketProvider - Initializes WebSocket connection for the entire app
 * Should be placed near the root of the component tree
 */
const WebSocketProvider = ({ children }: Props) => {
  const { isConnected } = useWebSocket();

  useEffect(() => {
    console.log('🔌 WebSocket status:', isConnected ? 'Connected' : 'Disconnected');
  }, [isConnected]);

  return <>{children}</>;
};

export default WebSocketProvider;

