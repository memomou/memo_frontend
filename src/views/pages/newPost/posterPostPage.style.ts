import styled from "styled-components";
import SlateEditor from "../../../components/SlateEditor/SlateEditor";
import { Editable } from "slate-react";
import { PostForm } from "../../../components/PostForm.style";
export const StyledEditable = styled(Editable)`
  background-color: white;
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

export const PosterNewPageContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  padding: 10px 0px;

  .file-item {
    display: flex;
    justify-content: space-between;
    padding: 10px;
    border-bottom: 1px solid #e0e0e0;

    &:last-child {
      border-bottom: none;
    }
  }

  .file-name {
    flex: 1;
    color: #1a73e8;
    text-decoration: none;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;

    &:hover {
      text-decoration: underline;
    }
  }

  .file-info {
    color: #9e9e9e;
    font-size: 0.8em;
    margin-right: 10px;
    text-align: right;
    white-space: nowrap;
  }

  .delete-button {
    background-color: #f44336;
    color: white;
    border: none;
    padding: 5px 10px;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s;
    font-size: 0.9em;

    &:hover {
      background-color: #d32f2f;
    }
  }

  .editor-container {
    display: flex;
    flex-direction: column;
    flex: 1;
    min-height: 567px;
    width: -webkit-fill-available;
    justify-content: center;
    margin-top: 10px;
    max-width: 700px;

    .options-bar {
      width: -webkit-fill-available;
      max-width: 700px;
      display: flex;
      justify-content: space-between;
      align-items: center;

      select {
        font-size: 1.2rem;
        border: 1px solid #eee;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        padding: 2px 5px;
        background-color: white;
        border-radius: 5px;
      }

      .visibility-toggle {
        display: flex;
        align-items: center;
        font-size: 0.9rem;

        label {
          margin-right: 10px;
        }

        input[type="checkbox"] {
          margin-right: 5px;
        }
      }
    }
  }
`;

export const PosterNewContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  max-width: 700px;
  padding: 20px;
  font-size: 0.9rem; // 기본 폰트 크기 축소




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

  // 파일 업로드 영역 스타일 개선
  .file-upload-wrapper {
    width: 100%;
    margin-bottom: 20px;
    font-size: 0.5rem; // 파일 업로드 영역 폰트 크기 축소
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

    & > div {
      display: flex;
      gap: 10px;
    }

    & > div > button {
      font-size: 1.2rem;
      padding: 3px 4px;
      color: white;
      border-radius: 5px;
    }

    & > div >button:nth-child(1) {
      color: #12b886;
      font-weight: 600;
    }
    & > div >button:nth-child(2) {
      background-color: #12b886;
    }
  }
`;

export const UploadProgressText = styled.div`
  position: absolute;
  bottom: 5px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 0.8rem;
  color: #12b886;
`;
