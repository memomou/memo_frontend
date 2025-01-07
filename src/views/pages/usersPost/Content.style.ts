import styled from "styled-components";

export const ContentContainer = styled.div`
  // font-size: 1.1rem;
  display: flex;
  flex: 1;
  flex-direction: row;
  padding: 20px;
  flex-grow: 5;

  .recentPosterWrapper {
    flex: 4;
    .topContainer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .recentPostText {
        font-size: 1.2rem;
        display: flex;
        flex-direction: row;
        align-items: center;
        flex: 1;
        justify-content: space-between;
        margin-right: 20px;
        .categoryName {
          font-weight: 500;
          margin-right: 10px;
        }
        input {
          font-weight: 500;
          margin-right: 10px;
          padding: 5px;
          width: 200px; // 적절한 너비 설정
          max-width: 100%; // 반응형을 위한 최대 너비 설정
        }
        .save-btn {
          font-size: 0.8rem;
        }

        .cancel-btn {
          font-size: 0.8rem;
        }
        .separator {
          margin: 0 5px;
          font-weight: normal;
        }
      }
      .mdf {
        font-size: 0.8rem;
        color: #999;
      }
      .searchInputWrapper {
        min-width: 200px;
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
