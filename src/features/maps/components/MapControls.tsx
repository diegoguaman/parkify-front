import { Box, Button, Divider, Paper, Stack } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { grey } from "@mui/material/colors";
import { AddressAutocomplete } from "../../parkings/components/AddressAutocomplete";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import FilterComponent from "./FilterComponent";
import React from "react";
import { useNavigate } from "react-router-dom";
type MapControlsProps = {
  toggleList?: () => void;
  showList?: boolean
};
const MapControls = ({ toggleList, showList  }: MapControlsProps) => {
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false)
  return (
    <>
      <Box
        sx={{
          zIndex: 1000,
          width: {xs: "100%", md:"30%"} ,
          position:"relative"
        }}
      >
        <Paper sx={{ px: 2, py: 1.5 }}>
          <Stack direction="row"  alignItems="center">
            <Box sx={{ width: "100%" }}>
              <AddressAutocomplete placeholder="Buscar zona" withSearchIcon />
            </Box>
          </Stack>
          <Box display="flex" justifyContent="space-between" sx={{ my: 0.5 }}>
            <Box
              display="flex"
              boxShadow={2}
              sx={{
                my: 1,
                border: "1px solid lightgrey",
                bgcolor: grey[100],
                borderRadius: 1,
              }}
            >
              {showList && (
              <Button
                  variant="text"
                  size="small"
                  onClick={toggleList}
                  sx={{
                    fontSize: "10px",
                    borderColor: "none",
                    cursor: "pointer",
                    color: grey[800],
                  }}
                >
                  Lista
                </Button>
              )}
              
              <Divider orientation="vertical" flexItem />
              <Button
                variant="text"
                size="small"
                sx={{
                  fontSize: "10px",
                  borderColor: "none",
                  cursor: "pointer",
                }}
                onClick={()=>navigate('/mapa')}
              >
                Mapa
              </Button>
            </Box>
            <Box display="flex" sx={{}}>
              <Button
                size="small"
                variant="outlined"
                startIcon={<FilterAltOutlinedIcon sx={{}} />}
                sx={{ borderColor: "none", cursor: "pointer", py: 0.5, }}
                onClick={()=> setOpen(!open)}
              >
                Filtros
              </Button>
            </Box>
          </Box>

          <Button
            fullWidth
            variant="contained"
            color="secondary"
            onClick={() => navigate("/recommended")}
            sx={{
              mt: 0.5,
              py: 0.5,
              textTransform: "none",
            }}
            endIcon={
              <ArrowForwardIosIcon
                sx={{
                  color: "black",
                  display: "flex",
                  alignItems: "center",
                }}
              />
            }
          >
            Recomendados
          </Button>
        </Paper>
      
        
         
           {open && ( <FilterComponent /> )}
       
      </Box>
      
      
    </>
  );
};

export default MapControls;
