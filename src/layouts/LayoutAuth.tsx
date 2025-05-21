import { Container } from "@mui/material";
import { Outlet} from "react-router-dom";
import ScrollToTop from "../shared/ui/components/ScrollToTop";


const LayoutAuth = () => {

  return(
    <>
      <Container disableGutters maxWidth={false} sx={{ p:0, mb:4}}>
        <ScrollToTop />
        <Outlet />
      </Container>
    </>
  )
  };
  
  export default LayoutAuth;