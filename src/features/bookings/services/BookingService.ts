import { api } from '../../../lib/axios';
import { AxiosError } from 'axios';

/**
 * BookingService - Maneja las reservas de parkings
 * Requiere autenticación (JWT token) y rol DRIVER
 */

// 📌 Tipos para reservas
export interface Booking {
  id: string;
  parkingId: string;
  parkingName: string;
  userId: string;
  startTime: string;
  endTime: string;
  status: 'PENDING' | 'CONFIRMED' | 'CANCELLED' | 'COMPLETED';
  totalPrice: number;
  createdAt: string;
}

export interface CreateBookingRequest {
  parkingId: string;
  startTime: Date;
  endTime: Date;
}

/**
 * Crea una nueva reserva
 * @param bookingData - Datos de la reserva
 * @returns Reserva creada
 */
export async function createBooking(
  bookingData: CreateBookingRequest
): Promise<Booking> {
  try {
    const payload = {
      parkingId: bookingData.parkingId,
      startTime: bookingData.startTime.toISOString(),
      endTime: bookingData.endTime.toISOString(),
    };

    const { data } = await api.post<Booking>('/bookings', payload);
    return data;
  } catch (error) {
    console.error('Error creating booking:', error);
    throw error as AxiosError;
  }
}

/**
 * Obtiene todas las reservas del usuario actual
 * @returns Array de reservas
 */
export async function getMyBookings(): Promise<Booking[]> {
  try {
    const { data } = await api.get<{ data: Booking[] }>('/bookings/my');
    return data.data;
  } catch (error) {
    console.error('Error fetching bookings:', error);
    throw error as AxiosError;
  }
}

/**
 * Obtiene una reserva específica por ID
 * @param id - ID de la reserva
 * @returns Reserva
 */
export async function getBookingById(id: string): Promise<Booking> {
  try {
    const { data } = await api.get<Booking>(`/bookings/${id}`);
    return data;
  } catch (error) {
    console.error('Error fetching booking:', error);
    throw error as AxiosError;
  }
}

/**
 * Cancela una reserva
 * @param id - ID de la reserva
 * @returns Reserva cancelada
 */
export async function cancelBooking(id: string): Promise<Booking> {
  try {
    const { data } = await api.patch<Booking>(`/bookings/${id}/cancel`);
    return data;
  } catch (error) {
    console.error('Error cancelling booking:', error);
    throw error as AxiosError;
  }
}

const bookingService = {
  createBooking,
  getMyBookings,
  getBookingById,
  cancelBooking,
};

export default bookingService;

