import styled from "styled-components";
import { TextProps } from "./Text";

const InputStyled = styled.input.attrs({
  type: "password",
})<TextProps>`
  background-color: ${(props) => props.$bgColor};
  font-size: 2rem;
  height: 50px;
`;

function Input() {
  return ( <InputStyled $bgColor="lightblue" /> );
}

export default Input;
