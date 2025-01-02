import styled from "styled-components";
import { PostForm } from "../../../components/PostForm.style";
import SlateEditor from "../../../components/SlateEditor";

export const PageContainer = styled.div`
  // font-size: 1.1rem;
  display: flex;
  flex: 1;
  flex-direction: row;
  padding: 20px;
  padding-top: 0px;
  flex-grow: 5;

  .attachment-section {
    margin-top: 20px;
  }

  .file-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
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
    margin-left: 10px;
    text-align: right;
    white-space: nowrap;
  }
`;

export const PosterNewContainer = styled.div`
  display: flex;
  align-items: center;
  flex: 5;
  flex-direction: column;
  padding: 20px;
  .options-bar {
    width: -webkit-fill-available;
    display: flex;
    justify-content: space-between;

    .category-tag {
      font-size: 1.3rem;
      top: 10px;
      left: 10px;
      color: #333;
      padding: 4px 8px;
      font-weight: 600;
    }
  }

  .editor-container {
    display: flex;
    flex: 1;
    flex-direction: row;
    width: -webkit-fill-available;
    justify-content: center;
    min-height: 450px;
    margin-top: 10px;
  }
`;

export const DetailPosterForm = styled.div`
  ${PostForm}
  min-height: 450px;

  .wrapperOne {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 10px 0 10px;
    .title {
      font-size: var(--font-size-title);
    }
    .date {
      color: #999;
      font-size: 0.8rem;
    }
  }
  .wrapperTwo {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 3px solid #eee;
    padding: 10px;
    .author {
      font-size: 0.8rem;
    }
    .modification {
      font-size: 0.8rem;
    }
  }
  .content {
    padding: 10px;
    flex: 1;
  }

  // 첨부 파일 섹션을 위한 새로운 스타일
  .attachment-section {
    margin-top: 20px;

    h4 {
      font-size: 1rem;
      margin-bottom: 10px;
      color: #333;
    }
  }

  // 업로드된 파일 목록을 위한 스타일
  .uploaded-files {
    width: 100%;
    border: 1px solid #eee;
    border-radius: 5px;
    padding: 1px 10px;
    background-color: #f9f9f9;

    .file-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 5px 0;
      border-bottom: 1px solid #eee;
      font-size: 0.8rem;

      &:last-child {
        border-bottom: none;
      }

      a {
        color: #12b886;
        text-decoration: none;
        flex-grow: 1;
        margin-right: 10px;
        &:hover {
          text-decoration: underline;
        }
      }

      .file-size {
        color: #888;
        font-size: 0.75rem;
        white-space: nowrap;
      }
    }
  }

  // 파일 업로드 영역 스타일 (DetailPostPage에서는 사용하지 않지만, 일관성을 위해 포함)
  .file-upload-wrapper {
    width: 100%;
    margin-bottom: 20px;
    font-size: 0.85rem;
  }
`;
export const StyledSlateEditor = styled(SlateEditor)`
`;

export default DetailPosterForm;
