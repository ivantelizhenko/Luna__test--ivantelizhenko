import { MouseEvent, ReactNode } from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
  background-color: #023047;
  color: #fff;
  border: none;
  padding: 1.2rem 2.4rem;
  font-size: 2rem;
  border-radius: 25px;
`;

type ButtonProps = {
  children: ReactNode;
  onClick?: (e: MouseEvent) => void;
  type?: 'submit' | 'reset' | 'button';
};

function Button({ children, type = 'button' }: ButtonProps) {
  return <StyledButton type={type}>{children}</StyledButton>;
}

export default Button;
