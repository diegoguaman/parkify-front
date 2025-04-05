import { Box, Button } from "@mui/material"
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import { Link as RouterLink } from "react-router-dom";


const HeaderForm : React.FC = () => {
  return (
    <Box
        sx={{
          pl: 4,
          boxShadow: "0px 4px 5px rgba(0, 0, 0, 0.3)",
          height: 48,
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          marginBottom: 4
        }}
      >
        <Button
          component={RouterLink} 
          startIcon={<KeyboardArrowLeftIcon />} 
          to="/"
        >Volver</Button>
      </Box>
  )
}

export default HeaderForm
