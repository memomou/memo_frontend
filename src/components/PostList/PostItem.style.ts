import styled from "styled-components";

const PostItemWrapper = styled.div`
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
      font-weight: 500;
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
`;

export default PostItemWrapper;
