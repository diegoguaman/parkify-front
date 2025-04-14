import { useSearchParams } from 'react-router-dom';
import { OpenInMapsButton } from '../../../shared/ui/components/OpenInMapsButton';

export const ConfirmacionReserva = () => {
  const [params] = useSearchParams();
  const name = params.get('name');
  const lat = Number(params.get('lat'));
  const lng = Number(params.get('lng'));

  return (
    <div>
      <h2>¡Reserva enviada!</h2>
      <p>Has contactado con {name}</p>
      <OpenInMapsButton lat={lat} lng={lng} />
    </div>
  );
};
