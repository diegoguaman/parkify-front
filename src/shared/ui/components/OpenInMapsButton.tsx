type Props = { lat: number; lng: number };

export const OpenInMapsButton = ({ lat, lng }: Props) => {
  const handleOpen = () => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
    window.open(url, '_blank');
  };

  return <button onClick={handleOpen}>Ir con Google Maps</button>;
};
