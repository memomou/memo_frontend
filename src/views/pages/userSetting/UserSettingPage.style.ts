import styled from 'styled-components';

export const UserSettingContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;

  h1 {
    text-align: center;
    margin-bottom: 20px;
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 20px;

    div {
      display: flex;
      flex-direction: column;
      gap: 5px;
    }

    label {
      font-weight: bold;
    }

    input[type="text"], input[type="file"] {
      padding: 10px;
      border: 1px solid #ddd;
      border-radius: 4px;
    }

    button {
      padding: 10px 20px;
      background-color: #3498db;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      transition: background-color 0.3s;

      &:hover {
        background-color: #2980b9;
      }
    }
  }
`;
