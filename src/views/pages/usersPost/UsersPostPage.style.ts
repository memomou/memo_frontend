import styled from "styled-components";
import { media } from "../../../styles";

export const PageContainer = styled.div`
  // font-size: 1.1rem;
  display: flex;
  flex: 1;
  flex-direction: row;
  padding: 20px;
  padding-top: 0px;

  ${media.mobile} {
    padding: 0px;
    flex-direction: column;
  }
`;
