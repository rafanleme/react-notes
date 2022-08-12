import { ButtonStyled } from "./styles";

interface ButtonProps {
  children: React.ReactNode;
  handleClick: () => void;
  type?: "submit" | "reset" | "button";
}

function Button({ children, handleClick, type }: ButtonProps) {
  return (
    <ButtonStyled type={type} onClick={handleClick}>
      {children}
    </ButtonStyled>
  );
}

export default Button;
