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
  padding: 5px;
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

  div input {
    border: 0px;
    display: block;
    width: 100%;
    margin-bottom: 10px;
    padding-bottom: 2px;
    border-bottom: 1px solid #eee; /* 아래쪽 border */
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
