import Button from "@mui/material/Button";

interface ButtonPrimaryProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  fullWidth?: boolean;
}

const ButtonPrimary = ({ children, onClick, type, disabled, fullWidth }: ButtonPrimaryProps) => {
  return (
    <Button
      variant="contained"
      type={type}
      fullWidth={fullWidth}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </Button>
  );
};

export default ButtonPrimary;
