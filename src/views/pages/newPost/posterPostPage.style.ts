import styled from "styled-components";
import SlateEditor from "../../../components/SlateEditor/SlateEditor";
import { Editable, Slate, withReact } from "slate-react";
import { PostForm } from "../../../components/PostForm.style";
export const StyledEditable = styled(Editable)`
  background-color: white;
  border-bottom: 1px solid #eee; /* 아래쪽 border */
  /* border-top: none;             위쪽 border 제거 */
  /* min-height: 600px; */
  flex: 1;
  &:focus-visible {
  border: auto;
  outline: none;
  }
  /* 필요에 따라 추가 스타일 정의 */
  padding: 10px;

`;

export const StyledSlateEditor = styled(SlateEditor)`
`;

export const PosterNewContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  flex: 1;
`;

export const PosterNewForm = styled.form`
  ${PostForm}

  .title-input {
    width: 100%;
    border: 0px;
    display: block;
    margin-bottom: 10px;
    padding: 10px;
    border-bottom: 3px solid #eee; /* 아래쪽 border */
    font-size: var(--font-size-title);
    &::placeholder {
      color: #ccc;
    }
  }
  .material-icons {
    font-size: 1.8rem;
  }

  .editor-wrapper {
    width: 100%;
    flex: 1;
    display: flex;
    flex-direction: column;
    margin-bottom: 10px;
    .text-editor-wrapper {
      flex: 1;
      display: flex;
      flex-direction: column;
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


  label {
    display: flex;
    align-items: center;
    span {
      min-width: 80px;
    }
  }

  & > .BottomContainer {
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
      font-size: 1.2rem;
      background-color: #12b886;
      height: 37px;
      aspect-ratio: 5 / 2;
      color: white;
      border-radius: 5px;
    }
  }
`;
