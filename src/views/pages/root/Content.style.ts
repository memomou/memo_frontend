import styled from "styled-components";

export const ContentContainer = styled.div`
  font-size: 1.1rem;
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 20px;
  .recentPosterWrapper {
    .recentPosterTitle {
      h1 {
        margin-bottom: 20px;
      }
    }
    .recentPosts {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 20px;
      .post {
        aspect-ratio: 8 / 5;
        background-color: white;
        padding: 20px;
        border-radius: 10px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        .title {
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 1;
          display: -webkit-box;
          line-height: 1.5rem;
          overflow: hidden;
          font-weight: bold;
          height: 26px;
        }
        .content {
          margin-top: 5px;
          padding-top: 10px;
          border-top: 1px solid #eee;
          color: #666;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 5;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: normal;
        }
      }
    }
  }
`;
