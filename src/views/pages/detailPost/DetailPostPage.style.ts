import styled from "styled-components";
import { PostForm } from "../../../components/PostForm.style";

const DetailPosterForm = styled.div`
  ${PostForm}


  .title {
    font-size: var(--font-size-title);
    border-bottom: 3px solid #eee;
    padding: 10px;
  }

  .content {
    padding: 10px;
  }
`;

export default DetailPosterForm;
