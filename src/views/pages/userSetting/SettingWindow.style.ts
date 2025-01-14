import styled from 'styled-components';

export const SettingWindowWrapper = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  margin: 20px auto;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  min-height: 65vh;
  width: min(100%, 550px);

  .title {
    text-align: center;
    color: #333;
    margin-bottom: 2rem;
    display: block;
    font-size: 1.5rem;
  }
`;
