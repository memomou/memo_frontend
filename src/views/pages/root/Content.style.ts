import styled from "styled-components";

export const ContentContainer = styled.div`
  // font-size: 1.1rem;
  display: flex;
  flex: 1;
  flex-direction: row;
  padding: 20px;
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
      .recentPostText {
        font-size: 1.2rem;
        font-weight: bold;
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
        border: 2px solid transparent;
        &:hover {
          box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
          border-color: rgba(52, 152, 219, 0.35); // 더 옅은 파란색
        }
        .top-wrapper {
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
          margin-top: 5px;
          flex: 1;
          padding-top: 10px;
          border-top: 1px solid #eee;
          color: #666;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 5;
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
            display: flex;
            align-items: center;
            font-size: 0.8rem;
            color: #666;
            .profile-image {
              width: 20px;
              height: 20px;
              border-radius: 50%;
              margin-right: 5px;
              object-fit: cover;
            }
          }
          .date {
            font-size: 0.7rem;
            color: #999;
          }
        }
      }
    }
  }
`;
