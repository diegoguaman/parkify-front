import { FC, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

/**
 * MapWrapper - Simple wrapper for map components
 * No longer needs to load external scripts since we're using Leaflet
 */
export const MapWrapper: FC<Props> = ({ children }) => {
  return <>{children}</>;
};
