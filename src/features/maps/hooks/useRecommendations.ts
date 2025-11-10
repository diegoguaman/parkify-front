import { useMemo } from 'react';
import { Parking } from '../../../store/parking.store';
import { calculateRecommendedZones, RecommendedZone } from '../utils/recommendations';

type UseRecommendationsOptions = {
  radiusKm?: number;
  minParkingsInZone?: number;
  minAvailableSpots?: number;
  maxZones?: number;
};

/**
 * Hook to calculate and manage recommended parking zones
 * Automatically recalculates when parkings or user location changes
 */
export const useRecommendations = (
  parkings: Parking[],
  userLat?: number,
  userLng?: number,
  options: UseRecommendationsOptions = {}
): RecommendedZone[] => {
  const zones = useMemo(() => {
    if (!parkings || parkings.length === 0) return [];

    return calculateRecommendedZones(parkings, userLat, userLng, {
      radiusKm: options.radiusKm ?? 0.5,
      minParkingsInZone: options.minParkingsInZone ?? 2,
      minAvailableSpots: options.minAvailableSpots ?? 3,
      maxZones: options.maxZones ?? 5,
    });
  }, [parkings, userLat, userLng, options.radiusKm, options.minParkingsInZone, options.minAvailableSpots, options.maxZones]);

  return zones;
};

