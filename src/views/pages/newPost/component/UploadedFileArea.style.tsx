import styled from 'styled-components';

export const UploadedFileArea = styled.div`
  width: 100%;
  margin-bottom: 20px;
  border: 1px solid #eee;
  border-radius: 5px;
  padding: 1px 10px;
  background-color: #f9f9f9;
  /* font-size: 0.7rem; // 파일 목록 폰트 크기 축소 */

  .file-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 3px 0;
    border-bottom: 1px solid #eee;
    font-size: 0.8rem;

    &:last-child {
      border-bottom: none;
    }

    a {
      color: #12b886;
      text-decoration: none;
      &:hover {
        text-decoration: underline;
      }
    }

    button {
      background-color: #ff6b6b;
      color: white;
      border: none;
      padding: 0px 2px;
      border-radius: 3px;
      cursor: pointer;
      font-size: 0.8rem; // 삭제 버튼 폰트 크기 축소
      &:hover {
        background-color: #ff5252;
      }
    }
  }
`;
