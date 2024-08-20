import styled from "styled-components";
import { PostForm } from "../../../components/PostForm.style";

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
