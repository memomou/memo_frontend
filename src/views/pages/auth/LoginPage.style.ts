import styled from "styled-components";

export const LoginPageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  align-items: center;
  .login-title {
    text-align: center;
    color: #2c3e50;
    margin-bottom: 30px;
    font-weight: 600;
  }

  .input-group {
    margin-bottom: 20px;
  }

  label {
    display: block;
    margin-bottom: 5px;
    color: #34495e;
    font-weight: 500;
  }

  input {
    width: 100%;
    padding: 12px;
    border: 1px solid #bdc3c7;
    border-radius: 8px;
    font-size: 16px;
    transition: border-color 0.3s, box-shadow 0.3s;
  }

  input:focus {
    outline: none;
    border-color: #3498db;
    box-shadow: 0 0 0 2px rgba(52, 152, 219, 0.2);
  }

  .login-button {
    width: 100%;
    padding: 12px;
    background-color: #3498db;
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-size: 16px;
    font-weight: 600;
    transition: background-color 0.3s, transform 0.1s;
  }

  .login-button:hover {
    background-color: #2980b9;
  }

  .login-button:active {
    transform: scale(0.98);
  }

  .or-text {
    margin-top: 20px;
    text-align: center;
    font-weight: 500;
  }

  .additional-options {
    margin-top: 20px;
    text-align: center;
    a {
      color: #3498db;
      display: block;
      margin-top: 10px;
      color: #3498db;
      text-decoration: none;
      font-weight: 500;
    }
  }
`;
