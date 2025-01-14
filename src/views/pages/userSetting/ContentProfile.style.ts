import styled from 'styled-components';

export const ContentProfileWrapper = styled.div`
  padding: 20px;
  .profile-section {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;
  }

  .profile-image {
    position: relative;
    width: 150px;
    height: 150px;
    border-radius: 50%;
    overflow: visible;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 50%;
    }

    .edit-button {
      position: absolute;
      bottom: 0;
      right: 0;
      background-color: #4a90e2; // 밝은 파란색으로 변경
      color: #fff;
      border: none;
      padding: 6px 12px;
      border-radius: 20px;
      cursor: pointer;
      transition: all 0.3s ease;
      font-size: 0.9rem;
      font-weight: 500;
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2); // 그림자 추가

      &:hover {
        background-color: #3a7bc8; // 호버 시 색상 변경
        transform: scale(1.05); // 호버 시 약간 확대
      }
    }
  }

  .profile-info {
    width: 100%;

    .info-item {
      margin-bottom: 1rem;

      label {
        display: block;
        margin-bottom: 0.5rem;
        color: #555;
      }

      input {
        width: 100%;
        padding: 0.5rem;
        border: 1px solid #ddd;
        border-radius: 4px;
        font-size: 1rem;

        &:focus {
          outline: none;
          border-color: #4a90e2;
        }
      }
    }
  }

  .save-button {
    display: block;
    width: 100%;
    padding: 0.75rem;
    background-color: #4a90e2;
    color: #fff;
    border: none;
    border-radius: 4px;
    font-size: 1rem;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
      background-color: #3a7bc8;
    }
  }
`;