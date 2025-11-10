import { io, Socket } from 'socket.io-client';

/**
 * WebSocketService - Manages real-time communication with backend
 * Handles parking availability updates via Socket.IO
 */
class WebSocketService {
  private socket: Socket | null = null;
  private readonly url: string;
  private reconnectAttempts: number = 0;
  private readonly maxReconnectAttempts: number = 5;

  constructor() {
    this.url = import.meta.env.VITE_WEBSOCKET_URL || 'http://localhost:3000';
  }

  /**
   * Establishes WebSocket connection to the server
   * Automatically handles reconnection logic
   */
  connect(): void {
    if (this.socket?.connected) {
      console.log('✅ WebSocket already connected');
      return;
    }

    this.socket = io(this.url, {
      transports: ['websocket', 'polling'],
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      reconnectionAttempts: this.maxReconnectAttempts,
    });

    this.setupEventListeners();
  }

  /**
   * Sets up core WebSocket event listeners
   */
  private setupEventListeners(): void {
    if (!this.socket) return;

    this.socket.on('connect', () => {
      console.log('✅ WebSocket connected:', this.socket?.id);
      this.reconnectAttempts = 0;
    });

    this.socket.on('disconnect', (reason: string) => {
      console.warn('⚠️ WebSocket disconnected:', reason);
    });

    this.socket.on('connect_error', (error: Error) => {
      this.reconnectAttempts++;
      console.error(`❌ Connection error (attempt ${this.reconnectAttempts}):`, error.message);
      
      if (this.reconnectAttempts >= this.maxReconnectAttempts) {
        console.error('❌ Max reconnection attempts reached. Please refresh the page.');
      }
    });

    this.socket.on('reconnect', (attemptNumber: number) => {
      console.log(`🔄 Reconnected after ${attemptNumber} attempts`);
    });
  }

  /**
   * Subscribes to parking availability updates
   * @param callback - Function to call when availability changes
   */
  onAvailabilityUpdate(callback: (data: AvailabilityUpdateData) => void): void {
    if (!this.socket) {
      console.error('❌ Socket not initialized. Call connect() first.');
      return;
    }

    this.socket.on('parking:availabilityUpdated', callback);
  }

  /**
   * Emits a request to update parking availability (owner action)
   * @param parkingId - ID of the parking to update
   * @param availableSpots - New number of available spots
   */
  updateAvailability(parkingId: string, availableSpots: number): void {
    if (!this.socket?.connected) {
      console.error('❌ Cannot emit: Socket not connected');
      return;
    }

    this.socket.emit('parking:updateAvailability', {
      parkingId,
      availableSpots,
      timestamp: new Date().toISOString(),
    });
  }

  /**
   * Subscribes to new parking creation events
   * @param callback - Function to call when a new parking is created
   */
  onParkingCreated(callback: (data: ParkingCreatedData) => void): void {
    if (!this.socket) {
      console.error('❌ Socket not initialized. Call connect() first.');
      return;
    }

    this.socket.on('parking:created', callback);
  }

  /**
   * Subscribes to parking deletion events
   * @param callback - Function to call when a parking is deleted
   */
  onParkingDeleted(callback: (data: { parkingId: string }) => void): void {
    if (!this.socket) {
      console.error('❌ Socket not initialized. Call connect() first.');
      return;
    }

    this.socket.on('parking:deleted', callback);
  }

  /**
   * Removes all listeners for a specific event
   * @param event - Event name to unsubscribe from
   */
  off(event: string): void {
    if (!this.socket) return;
    this.socket.off(event);
  }

  /**
   * Disconnects the WebSocket connection
   */
  disconnect(): void {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
      console.log('🔌 WebSocket disconnected manually');
    }
  }

  /**
   * Checks if WebSocket is currently connected
   */
  isConnected(): boolean {
    return this.socket?.connected ?? false;
  }

  /**
   * Gets the current socket instance (for advanced use)
   */
  getSocket(): Socket | null {
    return this.socket;
  }
}

// Types for WebSocket events
export interface AvailabilityUpdateData {
  parkingId: string;
  availableSpots: number;
  totalSpots?: number;
  timestamp: string;
}

export interface ParkingCreatedData {
  parkingId: string;
  parkingName: string;
  lat: number;
  lng: number;
  timestamp: string;
}

// Singleton instance
export const websocketService = new WebSocketService();

