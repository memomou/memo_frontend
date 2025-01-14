import styled from 'styled-components';

export const ContentPasswordWrapper = styled.div`
  padding: 20px;
  color: #555;

  .user-info {
    font-size: 1.1rem;
    font-weight: 500;
  }

  .id {
    margin-top: 1rem;
    font-size: 1.0rem;
  }

  .email {
    font-size: 1.0rem;
  }

  .change-password-title {
    margin-top: 2rem;
    font-size: 1.1rem;
    font-weight: 500;
  }

  .error-message {
    color: red;
    font-size: 0.8rem;
  }

  .password-form {
    margin-top: 1rem;
  }

  label, input {
    display: block;
  }
  input {
    width: 100%;
    padding: 3px;
    margin-top: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 4px;
  }

  label {
    margin-top: 1rem;
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
    margin-top: 1rem;
    &:hover {
      background-color: #3a7bc8;
    }
  }
`;
