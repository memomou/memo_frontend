import styled from "styled-components";

export const Styled = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  height: 100%;
  flex: 1;
  background-color: ${(props) => props.theme.ContentbgColor};
`;
