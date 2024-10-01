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
          font-weight: bold;
          margin-right: 10px;
        }
        input {
          font-weight: bold;
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
    .recentPosts {
      margin: 15px 0px;
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      gap: 0.7rem;
      .post {
        background-color: white;
        padding: 5px 10px;
        border-radius: 10px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        height: 100%;
        min-height: 150px;
        display: flex;
        flex-direction: column;
        transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
        cursor: pointer;
        border: 2px solid transparent;

        &:hover {
          box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
          border-color: rgba(52, 152, 219, 0.35); // 더 옅은 파란색
        }

        .top-wrapper {
          height: 26px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          .title {
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 1;
            display: -webkit-box;
            line-height: 1.5rem;
            overflow: hidden;
            font-weight: bold;
          }
        }
        .content {
          flex: 1;
          padding-top: 6px;
          border-top: 1px solid #eee;
          color: #666;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 6;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: normal;
          font-size: 0.9rem;
        }
        .bottom-wrapper {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 10px;
          .author {
            font-size: 0.8rem;
            color: #666;
          }
          .date {
            font-size: 0.7rem;
            color: #999;
          }
        }
      }
    }
  }

  .no-posts-message {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 150px;
    font-size: 1.5rem;
    color: #666;
    border-radius: 10px;
    margin-top: 20px;
    text-align: center;
    width: 100%;
  }
`;
