import CardContainer from "./CardContainer";
import ButtonHomeAction from "./ButtonHomeAction";
import { Box, Typography } from "@mui/material";
import { User } from "../../../store/auth.store";

interface AccountCardProps {
    user: User
}

const AccountCard = ({user}: AccountCardProps) => {
  console.log(user)
  return (
    <CardContainer>
      <Box textAlign="center">
        <Typography variant="body1" >
          ¡Hola!
        </Typography>
        <Typography variant="h1" sx={{ fontWeight: 800 }}>
          Armenía Parking
        </Typography>
      </Box>
      <Box sx={{width:"100%", maxWidth:"420px"}}>
        <ButtonHomeAction text="Mi cuenta" path="profile" />
      </Box>

      {/* <Typography variant='body1' >¡Hola!</Typography>
        <Typography variant='h1' sx={{fontWeight: 800}}>Armenia Parking</Typography> */}
    </CardContainer>
  );
};

export default AccountCard;
