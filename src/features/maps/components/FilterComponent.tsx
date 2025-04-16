import { Box, Button, Checkbox, FormControlLabel, Stack, } from "@mui/material";
import React from "react";
import CustomSlider from "./CustomSlider";
const MAX = 1000;
const MIN = 0;


const FilterComponent = () => {
  const [price, setPrice] = React.useState<number>(MAX/2);
  const [distance, setDistance] = React.useState<number>(MAX/2);
  
  return (
    <Box
      boxShadow={2}
      sx={{
        width: "70%",
        maxWidth:"400px",
        bgcolor: "#F6FFFC",
        position: "absolute",
        top: '8.2rem',
        right: 0,
        zIndex: 1100,
      }}
    >
      <Stack spacing={4} sx={{ py: 4, px:2, mx: "auto" }}>
      <CustomSlider
          label="Precio por hora"
          minLabel={`$${MIN}`}
          maxLabel={`$${MAX}`}
          value={price}
          onChange={setPrice}
        />
        <CustomSlider
          label="Distancia a mi"
          minLabel={`${MIN} Mt`}
          maxLabel={`${MAX} Km`}
          value={distance}
          onChange={setDistance}
        />
        
        <FormControlLabel control={<Checkbox />} label="Abierto ahora" />
        <Box>

        <Button variant="text">Limpiar</Button>
        </Box>
        
      </Stack>
    </Box>
  );
};

export default FilterComponent;
