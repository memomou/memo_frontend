import styled from "styled-components";

export const CommentFormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 10px;
  img {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    object-fit: cover;
  }

  textarea {
    min-height: 36px;
    max-height: 150px;
    width: 100%;
    resize: none;
    overflow-y: hidden;
    line-height: 1.5;
    padding: 8px;
    border: 1px solid #e0e0e0;
    border-radius: 4px;
  }

  button {
    align-self: flex-end;
    background-color: #12B886;
    color: white;
    border: none;
    border-radius: 4px;
    padding: 3px 5px;
    cursor: pointer;
  }

  textarea:disabled {
    background-color: #f8f9fa;
    cursor: not-allowed;

    &::placeholder {
      color: #6c757d;
    }
  }

  button:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;
