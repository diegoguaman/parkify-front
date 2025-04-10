import { FC, ReactNode } from 'react';
import { LoadScript } from '@react-google-maps/api';

interface Props {
  children: ReactNode;
}

export const MapWrapper: FC<Props> = ({ children }) => {
  const libraries: ('places')[] = ['places'];

  return (
    <LoadScript
      googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
      libraries={libraries}
    >
      {children}
    </LoadScript>
  );
};
