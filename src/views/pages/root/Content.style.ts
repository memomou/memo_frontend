import styled from "styled-components";
import { media } from "../../../styles";

export const ContentContainer = styled.div`
  // font-size: 1.1rem;
  display: flex;
  flex: 1;
  flex-direction: row;
  padding: 20px;

  ${media.mobile} {
    padding: 8px;
  }

  .sidebarWrapper {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 2px;
    margin-top: 53px;
    margin-right: 10px;
    padding: 10px;
    a {
      padding: 8px 10px;
      border: 1px solid #ddd;
    }
  }

  .recentPosterWrapper {
    flex: 4;
    .topContainer {
      display: flex;
      justify-content: space-between;
      align-items: center;

      ${media.mobile} {
        display: block;
      }
      .recentPostText {
        ${media.mobile} {
          display: none;
        }
        font-size: 1.2rem;
        font-weight: 500;
      }
      .searchInputWrapper {
        min-width: 200px;
        margin: 5px 0px;
        border: 1px solid #ddd;
        position: relative;
        display: flex;
        align-items: center;
        svg {
          margin-right: 10px;
          margin-left: 10px;
        }
        .searchInput {
          font-size: 1.3rem;
          width: 100%;
        }
      }
    }
  }
`;
