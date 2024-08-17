import styled from "styled-components";

export const ContentContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 20px;
  .recentPosterWrapper {
    .recentPosterTitle {
      h1 {
        font-size: 1.5rem;
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
        h4 {
          font-size: 1.4rem;
          margin-bottom: 10px;
        }
        p {
          font-size: 1.2rem;
          color: #666;
        }
      }
    }
  }
`;
