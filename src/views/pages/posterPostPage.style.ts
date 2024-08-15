import styled from "styled-components";
import SlateEditor from "../../components/SlateEditor/SlateEditor";
import { Editable, Slate, withReact } from "slate-react";

interface PosterNewFormProps {
  $bgColor?: string;
  $width?: string;
  $height?: string;
  $fontSize?: string;
}

export const StyledEditable = styled(Editable)`
  background-color: white;
  border-bottom: 1px solid #eee; /* 아래쪽 border */
  /* border-top: none;             위쪽 border 제거 */
  min-height: 200px;
  &:focus-visible {
  border: auto;
  outline: none;
  }
  /* 필요에 따라 추가 스타일 정의 */
`;

export const StyledSlateEditor = styled(SlateEditor)`
`;

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

  .title-input {
    width: 100%;
    border: 0px;
    display: block;
    margin-bottom: 10px;
    padding-bottom: 4px;
    border-bottom: 1px solid #eee; /* 아래쪽 border */
    font-size: 1.2rem;
    &::placeholder {
      color: #ccc;
    }
  }

  .editor-wrapper {
    width: 100%;
    .text-editor-wrapper {
    }
  }

  .placeholder {
    &:focus {
      display: none;
    }
    color: #ccc;
  }

  /* .BottomContainer {
    display: flex;
    justify-content: space-between;
    width: 100%;
    div {
      color: white;
    }
  } */

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

  }
  & > .BottomContainer {
    height: 30px;
    display: flex;
    justify-content: space-between;
    width: 100%;
    & > button:nth-child(1) {
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 5px;
      width: auto;
    }

    & > button:nth-child(2) {
      background-color: #12B886;
      width: 100px;
      color: white;
      border-radius: 5px;
    }
  }
`;

export default PosterNewForm;
