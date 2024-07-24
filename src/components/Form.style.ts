import { TextProps } from "./Text";
import styled from "styled-components";

const CenterForm = styled.form<TextProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding: 20px;
  border: 1px solid black;
  border-radius: 10px;
  background-color: white;
  label {
    display: flex;
    align-items: center;
    span {
      min-width: 80px;
    }
    input {
      background-color: ${(props) => props.$bgColor};
      height: ${(props) => props.$height ?? "15px"};
      width: ${(props) => props.$width ?? "150px"};
    }
  }
  button {
    width: 100px;
    height: 30px;
    cursor: pointer;
  }
`;

export default CenterForm;
