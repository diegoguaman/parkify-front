import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import IconButton from "@mui/material/IconButton";
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined';
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import MenuItem from "@mui/material/MenuItem";
import NoCrashOutlinedIcon from '@mui/icons-material/NoCrashOutlined';
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

import Logo from "../../assets/react.svg"; // Change to new Logo path

const Header: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  // Handle menu open
  const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  // Handle menu close
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const iconStyles = {
    display:"flex", 
    alignItems: "center", 
    marginY: 1
  };

  return (
    <AppBar position="static">
    <Toolbar >
      {/* Logo */}
      <Box sx={{ flexGrow: 1 }}>
        <img src={Logo} />
      </Box>

      {/* Buttons */}
      { isMobile ? (
        <>
        {/* Mobile version */}
          <IconButton color="inherit" onClick={handleMenuOpen}>
            <MenuIcon />
          </IconButton>

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            sx={{
              '& .MuiPaper-root': { 
                  backgroundColor: 'white',
                  color: 'black'
                }
            }}
          >
            <MenuItem onClick={handleMenuClose}>
              <Box sx={{ display:"flex", alignItems: "center", marginY: 1 }}>
                <HomeOutlinedIcon sx={{ marginRight: 1}}/>
                Inicio
              </Box>
            </MenuItem>

            <MenuItem onClick={handleMenuClose}>
            <Box sx={{ display:"flex", alignItems: "center", marginY: 1 }}>
              <ManageAccountsOutlinedIcon sx={{ marginRight: 1}}/>
                Panel de control
              </Box>
            </MenuItem>

            <MenuItem onClick={handleMenuClose}>
              <Box sx={{ display:"flex", alignItems: "center", justifyContent: "center", marginY: 1 }}>
                <NoCrashOutlinedIcon sx={{ marginRight: 1}}/> 
                Mis estacionamientos
              </Box>
            </MenuItem>

            <MenuItem onClick={handleMenuClose}>
              <Box sx={{ display:"flex", alignItems: "center", marginY: 1,  }}>
                <LogoutOutlinedIcon sx={{ marginRight: 1}}/> 
                Salir
              </Box>
            </MenuItem>
          </Menu>
        </>

      ) : (

      ( 
        <Box>
          {/* Desktop version */}
          <Button color="inherit">Inicio</Button>
          <Button color="inherit">Panel de control</Button>
          <Button color="inherit">Mis estacionamientos</Button>
          <Button variant="outlined" color="inherit">Salir</Button>
        </Box>
      )

      )}
    </Toolbar>
  </AppBar>
  );
}

export default Header;