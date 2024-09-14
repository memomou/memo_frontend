import styled from "styled-components";
import { PostForm } from "../../../components/PostForm.style";

export const PosterNewContainer = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
  flex-direction: column;

  .options-bar {
    display: flex;
    width: 500px;
    justify-content: space-between;
    margin-top: 38px;

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
`
const DetailPosterForm = styled.div`
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
