import { Autocomplete } from '@react-google-maps/api';
import { InputAdornment, TextField } from '@mui/material';
import { useRef } from 'react';
import { UseFormSetValue } from 'react-hook-form';
import { useParkingStore } from '../../../store/parking.store';
import SearchIcon from '@mui/icons-material/Search';
import { useUserLocationStore } from '../../maps/store/userLocation.store';
interface Props {
  setValue?: UseFormSetValue<any>;
  placeholder?: string;
  error?: boolean;
  helperText?: string;
  withSearchIcon?: boolean
}

export const AddressAutocomplete = ({ setValue, placeholder = "Dirección del estacionamiento", error, helperText, withSearchIcon }: Props) => {
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const setParkingData = useParkingStore((state) => state.setParkingData)
  const parkingData = useParkingStore((state) => state.getParkingData());
  const setLocation = useUserLocationStore((s) => s.setLocation);
  const onPlaceChanged = () => {
    if (autocompleteRef.current) {
      const place = autocompleteRef.current.getPlace();
      if (!place.geometry || !place.geometry.location) return;
      
      const parkingAddress = place.formatted_address ?? inputRef.current?.value ?? '';
      const lat = place.geometry.location.lat();
      const lng = place.geometry.location.lng();
      
      setValue?.("parkingAddress", parkingAddress, {
        shouldValidate: true,
        shouldTouch: true,
      });
      // Guarda en el store de parking
      setParkingData({ parkingAddress, lat, lng });
      // 🚀 Actualiza la ubicación global para centrar el mapa
      console.log("Nueva ubicación:", { lat, lng });
      setLocation({ lat, lng });
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
        placeholder={placeholder}
        defaultValue={parkingData.parkingAddress || ""}
        error={error}
        helperText={helperText}
        sx={{width:"100%"}}
        InputProps={{
          startAdornment: withSearchIcon ? (
            <InputAdornment position="start">
              <SearchIcon sx={{ color: "grey.500" }} />
            </InputAdornment>
          ) : undefined,
        }}
      />
    </Autocomplete>
  );
};
