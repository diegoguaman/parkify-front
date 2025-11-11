import { api } from '../../../lib/axios';
import { AxiosError } from 'axios';

/**
 * RecommendationService - Maneja las recomendaciones de parkings y zonas
 * Requiere autenticación (JWT token)
 */

// 📌 Tipos para zonas recomendadas
export interface RecommendedZone {
  id: string;
  name: string;
  center: {
    latitude: number;
    longitude: number;
  };
  radius: number;
  averagePrice: number;
  availableSpots: number;
  parkingsCount: number;
  score: number;
}

// 📌 Tipos para parkings recomendados
export interface RecommendedParking {
  id: string;
  name: string;
  address: string;
  location: {
    latitude: number;
    longitude: number;
  };
  distance: number;
  currentAvailability: number;
  hourlyRate: number;
  rating: number;
  parkingImageUrl: string;
  parkingPhone: string;
  score: number;
  recommendationReason: string;
}

/**
 * Obtiene zonas recomendadas basadas en ubicación
 * @param lat - Latitud del usuario
 * @param lon - Longitud del usuario
 * @param radius - Radio de búsqueda en km (default: 5)
 * @returns Array de zonas recomendadas
 */
export async function getRecommendedZones(
  lat: number,
  lon: number,
  radius: number = 5
): Promise<RecommendedZone[]> {
  try {
    const { data } = await api.get<{ data: RecommendedZone[] }>('/recommendations/zones', {
      params: { lat, lon, radius },
    });
    return data.data;
  } catch (error) {
    console.error('Error fetching recommended zones:', error);
    throw error as AxiosError;
  }
}

/**
 * Obtiene parkings recomendados basados en ubicación y preferencias
 * @param lat - Latitud del usuario
 * @param lon - Longitud del usuario
 * @param radius - Radio de búsqueda en km (default: 5)
 * @returns Array de parkings recomendados
 */
export async function getRecommendedParkings(
  lat: number,
  lon: number,
  radius: number = 5
): Promise<RecommendedParking[]> {
  try {
    const { data } = await api.get<{ data: RecommendedParking[] }>('/recommendations/parkings', {
      params: { lat, lon, radius },
    });
    return data.data;
  } catch (error) {
    console.error('Error fetching recommended parkings:', error);
    throw error as AxiosError;
  }
}

const recommendationService = {
  getRecommendedZones,
  getRecommendedParkings,
};

export default recommendationService;

