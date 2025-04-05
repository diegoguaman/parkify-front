import React, { useState } from "react";
import { Link } from "react-router-dom";
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import IconButton from "@mui/material/IconButton";
import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined';
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import MenuItem from "@mui/material/MenuItem";
import NoCrashOutlinedIcon from '@mui/icons-material/NoCrashOutlined';
import QuestionMarkOutlinedIcon from '@mui/icons-material/QuestionMarkOutlined';
import ThreePOutlinedIcon from '@mui/icons-material/ThreePOutlined';
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

const Header: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [currentUserType, setCurrentUserType] = useState<'landing' | 'OwnerNotLogged' | 'OwnerLogged'>('landing');
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  // Define the buttons for different user states
  const authenticatedButton = [
    {
      user: "landing",
      buttons: [
        { label: "Como funciona", icon: <HomeOutlinedIcon />, variant: "text", sectionId: "como-funciona", path: "/" },
        { label: "Reseña", icon: <NoCrashOutlinedIcon /> , variant: "text", sectionId: "reseña", path: "/" },
        { label: "Conectemos", icon: <LogoutOutlinedIcon />, variant: "text", sectionId: "conectemos", path: "/" },
        { label: "Panel de control", icon: <ManageAccountsOutlinedIcon />, variant: "outlined", path: "/register" },
      ],
      menuIcon: <MenuIcon />,
    },
    {
      user: "OwnerNotLogged",
      buttons: [
        { label: "Cómo funciona", icon: <QuestionMarkOutlinedIcon />, variant: "text", path: "/" },
        { label: "Reseña", icon: <ThreePOutlinedIcon />, variant: "text", path: "/" },
        { label: "Seguinos", icon: <LanguageOutlinedIcon />, variant: "text", path: "/" }
      ],
      menuIcon: <MenuIcon />,
    },
    {
      user: "OwnerLogged",
      buttons: [
        { label: "Mi cuenta", icon: <ManageAccountsOutlinedIcon />, variant: "text", path: "/" },
        { label: "Cerrar Sesión", icon: <LogoutOutlinedIcon />, color: "error.main", variant: "text", path: "/" },
      ],
      menuIcon: <AccountCircleOutlinedIcon />,
    },
  ]

  // Get the current user configuration
  const currentUserConfig = authenticatedButton.find(user => user.user === currentUserType) || authenticatedButton[0];

  // Handle menu open
  const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  // Handle menu close
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  // Scroll to Section in LandingPage 
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
    
    if (isMobile) {
      handleMenuClose();
    }
  }

  return (
    <AppBar position="static">
    <Toolbar >
    <Box 
      sx={{ 
        flexGrow: 1,
        maxWidth: 1152,
        width: "100%",
        mx: "auto",
        px: 2,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
       }}>
      {/* Logo */}
      <Box 
        component={Link}
        to={'/'}
        sx={{ flexGrow: 1 }}
      >
        <Box 
          component="img"
          src="/logoParkifyLightHeader.svg"
          alt="Logo"
          sx={{ width: 140, height: "auto", pt: 2 }}
        />
      </Box>

      {/* Buttons */}
      { isMobile ? (
        <>
        {/* Mobile version */}
          <IconButton color="inherit" onClick={handleMenuOpen}>
            {currentUserConfig.menuIcon}
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
            { currentUserConfig.buttons.map((button) => (
              <MenuItem 
                key={button.label} 
                onClick={() => scrollToSection(button.sectionId!)}
                component={Link}
                to={button.path || "/"}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "100%",
                }}
              >
                <Box sx={{ display:"flex", alignItems: "center", justifyContent: "center", color: button.color || "inherit" }}>
                <IconButton color="inherit" sx={{ marginRight: 1}}>
                  {button.icon}
                </IconButton>
                {button.label}
                </Box>
              </MenuItem>
            ))}
          </Menu>
        </>

      ) : (

      ( 
        <Box>
          {/* Desktop version */}
          { currentUserConfig.buttons.map((button) => (
            <Button 
              key={button.label}
              component={Link}
              onClick={() => scrollToSection(button.sectionId!)}
              to={button.path || "/"}
              sx={{
                color: button.color || "inherit",
                variant: button.variant || "text",
              }}
            >
              {button.label}
            </Button>
          ))}
        </Box>
      )
      )}
      </Box>
    </Toolbar>
  </AppBar>
  );
}

export default Header;