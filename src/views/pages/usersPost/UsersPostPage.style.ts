import styled from "styled-components";
import { media } from "../../../styles";

export const PageContainer = styled.div`
  // font-size: 1.1rem;
  display: grid;
  grid-template-columns: 230px calc(100% - 230px);
  grid-template-rows: max-content;
  flex: 1;

  ${media.mobile} {
    grid-template-columns: 1fr;
  }
`;
