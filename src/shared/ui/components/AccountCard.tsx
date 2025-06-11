import CardContainer from "./CardContainer";
import ButtonHomeAction from "./ButtonHomeAction";
import { Box, Typography } from "@mui/material";
//import { useParkingStore } from "../../../store/parking.store";
import { useAuthStore } from "../../../store/auth.store";


const AccountCard = () => {
  //const user = useAuthStore((state) => state.user);
  //const parking = useParkingStore((state) => state.parking)
  const user = useAuthStore((state) => state.user)
  return (
    <CardContainer>
      <Box textAlign="center" display="flex" flexDirection="column" gap={1}>
        <Typography variant="body1" >
          ¡Hola!
        </Typography>
        {user.username &&(
          <Typography variant="h1"  sx={{fontWeight: 800}}>
          {user.username}
        </Typography>
        )}
        {/* {parking &&(
          <Typography variant="h1"  sx={{fontWeight: 800}}>
          {parking.parkingName}
        </Typography>
        )} */}
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
