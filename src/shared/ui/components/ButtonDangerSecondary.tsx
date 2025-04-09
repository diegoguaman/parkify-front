import Button  from '@mui/material/Button'
import { useNavigate } from 'react-router-dom';

interface ButtonDangerSecondaryProps {
    text: string
    to?: string,
    onClick?: () => void;
    type?: "button" | "submit" | "reset";
    disabled?: boolean
}
const ButtonDangerSecondary = ({text, onClick, type, disabled, to} : ButtonDangerSecondaryProps) => {
  const navigate = useNavigate()

  const handleClick = () => {
    if (onClick) onClick()
    if (to) navigate(to)
  }
  return (
    <Button
          variant="outlined"
          type={type}
          color='error'
          sx={{border:"none"}}
          fullWidth
          onClick={handleClick}
          disabled={disabled}
        >
          {text}
    </Button>
  )
}

export default ButtonDangerSecondary
