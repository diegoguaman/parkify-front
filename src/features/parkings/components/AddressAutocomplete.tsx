import { Autocomplete } from '@react-google-maps/api';
import { TextField } from '@mui/material';
import { useRef } from 'react';
import { useParkingEditorStore } from '../store/parkingEditor.store';
import { UseFormSetValue } from 'react-hook-form';

interface Props {
  setValue: UseFormSetValue<any>;
  placeholder?: string;
}

export const AddressAutocomplete = ({ setValue, placeholder = "Dirección del estacionamiento" }: Props) => {
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const setParkingData = useParkingEditorStore((s) => s.setParkingData);

  const onPlaceChanged = () => {
    if (autocompleteRef.current) {
      const place = autocompleteRef.current.getPlace();
      if (!place.geometry || !place.geometry.location) return;

      const address = place.formatted_address ?? inputRef.current?.value ?? '';
      const lat = place.geometry.location.lat();
      const lng = place.geometry.location.lng();

      setValue("parkingAddress", address);
      setParkingData({ address, lat, lng });
    }
  };

  return (
    <Autocomplete
      onLoad={(autocomplete) => (autocompleteRef.current = autocomplete)}
      onPlaceChanged={onPlaceChanged}
    >
      <TextField
        inputRef={inputRef}
        fullWidth
        label={placeholder}
        margin="normal"
      />
    </Autocomplete>
  );
};
