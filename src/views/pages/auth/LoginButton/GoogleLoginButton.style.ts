import styled from "styled-components";

export const GoogleButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: white;
  margin-top: 10px;
  transition: background-color 0.2s;

  &:hover {
    background-color: #f8f8f8;
  }

  img {
    width: 20px;
    height: 20px;
    margin-right: 10px;
  }
`;
