import styled from "styled-components";

interface PosterNewFormProps {
  $bgColor?: string;
  $width?: string;
  $height?: string;
  $fontSize?: string;
}

const PosterNewForm = styled.form<PosterNewFormProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding: 20px;
  margin: 20px;
  border: 1px solid black;
  border-radius: 10px;
  background-color: white;
  width: ${(props) => props.$width ?? "300px"};

  input {
    border: 0px;
  }
  h1 {
    font-size: 23px;
  }
  label {
    display: flex;
    align-items: center;
    span {
      min-width: 80px;
    }
    input {
      background-color: ${(props) => props.$bgColor};
      height: ${(props) => props.$height ?? "22px"};
      width: ${(props) => props.$width ?? "150px"};
      font-size: ${(props) => props.$fontSize ?? "13px"};
    }
  }
  button {
    width: 100px;
    height: 30px;
    cursor: pointer;
  }
`;

export default PosterNewForm;
