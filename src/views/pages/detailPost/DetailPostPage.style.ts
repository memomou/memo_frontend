import styled from "styled-components";
import { PostForm } from "../../../components/PostForm.style";

export const PageContainer = styled.div`
  // font-size: 1.1rem;
  display: flex;
  flex: 1;
  flex-direction: row;
  padding: 20px;
  flex-grow: 5;

`;

export const PosterNewContainer = styled.div`
  display: flex;
  align-items: center;
  flex: 5;
  flex-direction: column;
  padding: 20px;
  .options-bar {
    width: -webkit-fill-available;
    max-width: 700px;
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
    flex-direction: row;
    width: -webkit-fill-available;
    justify-content: center;
    min-height: 70%;
  }
`;

export const DetailPosterForm = styled.div`
  ${PostForm}
  min-height: 70%;

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
  }
`;

export default DetailPosterForm;
