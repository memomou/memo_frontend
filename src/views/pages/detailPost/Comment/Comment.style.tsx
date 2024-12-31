import styled from "styled-components";

export const CommentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;

  & + & {
    border-top: 1px solid #e9ecef;
    padding-top: 15px;
  }

  .comment-user {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 3px;

    .comment-user-profile {
      img {
        width: 33px;
        height: 33px;
        border-radius: 50%;
        object-fit: cover;
      }
    }

    .comment-user-info {
      display: flex;
      flex-direction: column;
      gap: 10px;
      margin-left: 10px;

      .comment-user-nickname {
        font-size: 14px;
        font-weight: bold;
      }

      .comment-user-created-at {
        font-size: 12px;
        color: #888;
      }
    }

    .comment-user-delete {
      font-size: 12px;
      color: #888;
      margin-left: auto;
      cursor: pointer;
    }
  }

  .comment-content {
    font-size: 15px;
    margin-top: 10px;
    padding: 4px;
    padding-bottom: 10px;
  }
`;
