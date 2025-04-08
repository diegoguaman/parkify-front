import Button  from '@mui/material/Button'
import theme from '../theme';
import { useNavigate } from 'react-router-dom';

interface ButtonDangerPrimaryProps {
    text: string
    to?: string,
    onClick?: () => void;
    type?: "button" | "submit" | "reset";
    disabled?: boolean
}
const ButtonDangerPrimary = ({text, onClick, type, disabled, to} : ButtonDangerPrimaryProps) => {
  const navigate = useNavigate()

  const handleClick = () => {
    if (onClick) {
      console.log("hola", onClick)
      onClick()
    }
    if (to) navigate(to)
  }
  return (
    <Button
          variant="contained"
          type={type}
          fullWidth
          onClick={handleClick}
          disabled={disabled}
          sx={{backgroundColor: theme.palette.error.light,
            color: theme.palette.error.main, }}
        >
          {text}
    </Button>
  )
}

export default ButtonDangerPrimary