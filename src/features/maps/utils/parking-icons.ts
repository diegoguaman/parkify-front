import L from 'leaflet';

/**
 * Custom parking marker icons for Leaflet maps
 * Creates DivIcon with custom HTML and CSS styling
 */

/**
 * Creates a price marker icon with custom styling
 */
export const createPriceMarkerIcon = (price: number, type: 'normal' | 'full' | 'recommended') => {
  const className = `price-marker price-marker-${type}`;
  
  return L.divIcon({
    className: 'custom-price-marker',
    html: `
      <div class="${className}">
        $${price}
        <div class="price-marker-arrow"></div>
      </div>
    `,
    iconSize: [60, 40],
    iconAnchor: [30, 40],
  });
};

/**
 * Default parking icon (fallback)
 */
export const defaultParkingIcon = L.divIcon({
  className: 'custom-parking-marker',
  html: `
    <div class="price-marker price-marker-normal">
      <span>P</span>
      <div class="price-marker-arrow"></div>
    </div>
  `,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

