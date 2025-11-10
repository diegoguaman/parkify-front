import { InputAdornment, TextField, Box, List, ListItem, ListItemButton, ListItemText, Paper } from '@mui/material';
import { useState, useEffect, useCallback } from 'react';
import { UseFormSetValue } from 'react-hook-form';
import { useParkingStore } from '../../../store/parking.store';
import SearchIcon from '@mui/icons-material/Search';
import { useUserLocationStore } from '../../maps/store/userLocation.store';

interface Props {
  setValue?: UseFormSetValue<any>;
  placeholder?: string;
  error?: boolean;
  helperText?: string;
  withSearchIcon?: boolean;
}

interface NominatimResult {
  display_name: string;
  lat: string;
  lon: string;
  place_id: number;
}

/**
 * AddressAutocomplete - Free address search using Nominatim (OpenStreetMap)
 * No API key required - completely free alternative to Google Places
 */
export const AddressAutocomplete = ({ 
  setValue, 
  placeholder = "Dirección del estacionamiento", 
  error, 
  helperText, 
  withSearchIcon 
}: Props) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState<NominatimResult[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  
  const setParkingData = useParkingStore((state) => state.setParkingData);
  const parkingData = useParkingStore((state) => state.getParkingData());
  const setLocation = useUserLocationStore((s) => s.setLocation);

  // Debounced search function
  const searchAddress = useCallback(async (query: string) => {
    if (query.length < 3) {
      setSuggestions([]);
      return;
    }

    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=5&countrycodes=ar,cl,mx,es,co,pe,uy`,
        {
          headers: {
            'Accept': 'application/json',
          },
        }
      );
      
      if (response.ok) {
        const data: NominatimResult[] = await response.json();
        setSuggestions(data);
        setShowSuggestions(true);
      }
    } catch (error) {
      console.error('Error searching address:', error);
    }
  }, []);

  // Debounce effect
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchTerm) {
        searchAddress(searchTerm);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm, searchAddress]);

  const handleSelectAddress = (result: NominatimResult) => {
    const parkingAddress = result.display_name;
    const lat = parseFloat(result.lat);
    const lng = parseFloat(result.lon);

    setSearchTerm(parkingAddress);
    setShowSuggestions(false);

    setValue?.("parkingAddress", parkingAddress, {
      shouldValidate: true,
      shouldTouch: true,
    });

    // Save to parking store
    setParkingData({ parkingAddress, lat, lng });
    
    // Update global location to center map
    console.log("Nueva ubicación:", { lat, lng });
    setLocation({ lat, lng });
  };

  return (
    <Box sx={{ position: 'relative', width: '100%' }}>
      <TextField
        fullWidth
        size="small"
        label={placeholder}
        placeholder={placeholder}
        value={searchTerm || parkingData.parkingAddress || ""}
        onChange={(e) => setSearchTerm(e.target.value)}
        onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
        error={error}
        helperText={helperText}
        sx={{ width: "100%" }}
        InputProps={{
          startAdornment: withSearchIcon ? (
            <InputAdornment position="start">
              <SearchIcon sx={{ color: "grey.500" }} />
            </InputAdornment>
          ) : undefined,
        }}
      />
      
      {showSuggestions && suggestions.length > 0 && (
        <Paper
          sx={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            zIndex: 1000,
            maxHeight: 300,
            overflow: 'auto',
            mt: 0.5,
          }}
        >
          <List>
            {suggestions.map((result) => (
              <ListItem key={result.place_id} disablePadding>
                <ListItemButton onClick={() => handleSelectAddress(result)}>
                  <ListItemText 
                    primary={result.display_name}
                    primaryTypographyProps={{
                      fontSize: '0.875rem',
                    }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Paper>
      )}
    </Box>
  );
};
