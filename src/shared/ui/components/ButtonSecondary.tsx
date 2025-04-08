import Button  from '@mui/material/Button'
import { useNavigate } from 'react-router-dom';

interface ButtonSecondaryProps {
    text: string
    to?: string
    onClick?: () => void;
    disabled?: boolean
}
const ButtonSecondary = ({text, onClick, disabled, to} : ButtonSecondaryProps) => {
  const navigate = useNavigate()

  const handleClick = () => {
    if (onClick) onClick()
    if (to) navigate(to)
  }
  return (
    <Button
        type="submit"
        fullWidth
        variant="outlined"
        color="primary"
        sx={{
            fontSize: 14,
        }}
        onClick={handleClick}
        disabled={disabled}
        >
          {text}
    </Button>
  )
}

export default ButtonSecondary