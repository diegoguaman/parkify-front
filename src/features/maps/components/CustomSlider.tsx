import { Box, Slider, Typography } from "@mui/material";
import React from "react";

const MAX = 1000;
const MIN = 0;
const marks = [
  { value: MIN, label: "" },
  { value: MAX, label: "" },
];

type CustomSliderProps = {
  label: string;
  minLabel: string;
  maxLabel: string;
  value: number;
  onChange: (value: number) => void;
};

const CustomSlider: React.FC<CustomSliderProps> = ({
  label,
  minLabel,
  maxLabel,
  value,
  onChange,
}) => {
  return (
    <Box>
      <Typography
        variant="body2"
        sx={{ cursor: "pointer", color: "grey.500" }}
      >
        {label}
      </Typography>
      <Slider
        marks={marks}
        step={10}
        value={value}
        valueLabelDisplay="auto"
        min={MIN}
        max={MAX}
        onChange={(_, newValue) => onChange(newValue as number)}
        disabled={value === 0}
      />
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography
          variant="body2"
          onClick={() => onChange(MIN)}
          sx={{ cursor: "pointer", color: "grey.300" }}
        >
          {minLabel}
        </Typography>
        <Typography
          variant="body2"
          onClick={() => onChange(MAX)}
          sx={{ cursor: "pointer", color: "grey.300" }}
        >
          {maxLabel}
        </Typography>
      </Box>
    </Box>
  );
};

export default CustomSlider;