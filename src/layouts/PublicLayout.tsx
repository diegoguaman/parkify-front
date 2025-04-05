import React from "react";
import { Outlet } from "react-router-dom";
import { Container } from "@mui/material";
import Header from "../shared/ui/Header";

const PublicLayout: React.FC = () => {
  return (
    <>
      {/* <Header /> */}
        <Header />
      <Container disableGutters maxWidth={false} sx={{ p:0, mb:4}}>
        <Outlet />
      </Container>
      {/* <Footer /> */}
    </>
  );
};

export default PublicLayout;