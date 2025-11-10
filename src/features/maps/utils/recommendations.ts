import { Parking } from '../../../store/parking.store';

/**
 * Represents a recommended zone with aggregated parking data
 */
export interface RecommendedZone {
  id: string;
  centerLat: number;
  centerLng: number;
  radius: number;
  parkingsInZone: Parking[];
  totalAvailableSpots: number;
  averagePrice: number;
  score: number;
  color: string;
}

/**
 * Calculates distance between two points using Haversine formula
 * @returns distance in kilometers
 */
const calculateDistance = (
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number
): number => {
  const R = 6371; // Earth radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

/**
 * Groups parkings into clusters based on proximity
 * @param parkings - Array of parkings to cluster
 * @param radiusKm - Maximum radius for grouping (default 0.5km)
 * @returns Array of parking clusters
 */
const clusterParkings = (
  parkings: Parking[],
  radiusKm: number = 0.5
): Parking[][] => {
  const clusters: Parking[][] = [];
  const processed = new Set<string>();

  parkings.forEach((parking) => {
    if (processed.has(parking.id)) return;

    const cluster: Parking[] = [parking];
    processed.add(parking.id);

    parkings.forEach((otherParking) => {
      if (processed.has(otherParking.id)) return;

      const distance = calculateDistance(
        parking.lat,
        parking.lng,
        otherParking.lat,
        otherParking.lng
      );

      if (distance <= radiusKm) {
        cluster.push(otherParking);
        processed.add(otherParking.id);
      }
    });

    if (cluster.length > 0) {
      clusters.push(cluster);
    }
  });

  return clusters;
};

/**
 * Calculates a score for a zone based on multiple factors
 * Higher score = better recommendation
 */
const calculateZoneScore = (
  parkingsInZone: Parking[],
  userLat?: number,
  userLng?: number
): number => {
  if (parkingsInZone.length === 0) return 0;

  const totalAvailable = parkingsInZone.reduce(
    (sum, p) => sum + (p.availableSpots ?? 0),
    0
  );
  const avgPrice =
    parkingsInZone.reduce((sum, p) => sum + p.hourlyRate, 0) /
    parkingsInZone.length;

  // Factors for scoring (weights can be adjusted)
  const availabilityScore = totalAvailable * 10; // More spots = better
  const priceScore = Math.max(0, 100 - avgPrice * 5); // Lower price = better
  const densityScore = parkingsInZone.length * 15; // More parkings = more options

  let distanceScore = 0;
  if (userLat && userLng) {
    const centerLat =
      parkingsInZone.reduce((sum, p) => sum + p.lat, 0) / parkingsInZone.length;
    const centerLng =
      parkingsInZone.reduce((sum, p) => sum + p.lng, 0) / parkingsInZone.length;
    const distance = calculateDistance(userLat, userLng, centerLat, centerLng);
    distanceScore = Math.max(0, 100 - distance * 20); // Closer = better
  }

  return availabilityScore + priceScore + densityScore + distanceScore;
};

/**
 * Determines color based on zone score
 */
const getZoneColor = (score: number): string => {
  if (score >= 200) return '#4caf50'; // Green - Excellent
  if (score >= 100) return '#8bc34a'; // Light Green - Good
  if (score >= 50) return '#ffc107'; // Yellow - Moderate
  return '#ff9800'; // Orange - Low
};

/**
 * Calculates recommended zones based on parking availability and location
 * @param parkings - Array of all parkings
 * @param userLat - User's latitude (optional, for distance scoring)
 * @param userLng - User's longitude (optional, for distance scoring)
 * @param options - Configuration options
 * @returns Array of recommended zones sorted by score
 */
export const calculateRecommendedZones = (
  parkings: Parking[],
  userLat?: number,
  userLng?: number,
  options: {
    radiusKm?: number;
    minParkingsInZone?: number;
    minAvailableSpots?: number;
    maxZones?: number;
  } = {}
): RecommendedZone[] => {
  const {
    radiusKm = 0.5,
    minParkingsInZone = 2,
    minAvailableSpots = 3,
    maxZones = 5,
  } = options;

  // Filter out parkings with no availability
  const availableParkings = parkings.filter(
    (p) => (p.availableSpots ?? 0) >= 1
  );

  if (availableParkings.length === 0) return [];

  // Cluster parkings by proximity
  const clusters = clusterParkings(availableParkings, radiusKm);

  // Convert clusters to zones
  const zones: RecommendedZone[] = clusters
    .filter((cluster) => cluster.length >= minParkingsInZone)
    .map((cluster, index) => {
      const centerLat =
        cluster.reduce((sum, p) => sum + p.lat, 0) / cluster.length;
      const centerLng =
        cluster.reduce((sum, p) => sum + p.lng, 0) / cluster.length;
      const totalAvailableSpots = cluster.reduce(
        (sum, p) => sum + (p.availableSpots ?? 0),
        0
      );
      const averagePrice =
        cluster.reduce((sum, p) => sum + p.hourlyRate, 0) / cluster.length;
      const score = calculateZoneScore(cluster, userLat, userLng);
      const color = getZoneColor(score);

      return {
        id: `zone-${index}`,
        centerLat,
        centerLng,
        radius: radiusKm,
        parkingsInZone: cluster,
        totalAvailableSpots,
        averagePrice,
        score,
        color,
      };
    })
    .filter((zone) => zone.totalAvailableSpots >= minAvailableSpots)
    .sort((a, b) => b.score - a.score)
    .slice(0, maxZones);

  return zones;
};

/**
 * Finds the best single parking recommendation based on multiple factors
 * @param parkings - Array of all parkings
 * @param userLat - User's latitude
 * @param userLng - User's longitude
 * @returns Best parking recommendation or null
 */
export const findBestParking = (
  parkings: Parking[],
  userLat: number,
  userLng: number
): Parking | null => {
  const availableParkings = parkings.filter(
    (p) => (p.availableSpots ?? 0) >= 1
  );

  if (availableParkings.length === 0) return null;

  const scoredParkings = availableParkings.map((parking) => {
    const distance = calculateDistance(
      userLat,
      userLng,
      parking.lat,
      parking.lng
    );
    const availabilityScore = (parking.availableSpots ?? 0) * 10;
    const distanceScore = Math.max(0, 100 - distance * 30);
    const priceScore = Math.max(0, 100 - parking.hourlyRate * 5);
    const totalScore = availabilityScore + distanceScore + priceScore;

    return { parking, score: totalScore };
  });

  scoredParkings.sort((a, b) => b.score - a.score);

  return scoredParkings[0].parking;
};

/**
 * Checks if a parking is within a recommended zone
 */
export const isParkingInRecommendedZone = (
  parking: Parking,
  zones: RecommendedZone[]
): boolean => {
  return zones.some((zone) =>
    zone.parkingsInZone.some((p) => p.id === parking.id)
  );
};

