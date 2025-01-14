import { ReactNode } from 'react';

import styled from "styled-components";

interface WrapperProps {
  children: ReactNode;
}

const Styled = styled.div`
  margin: 0 auto;
  min-width: 250px;
  max-width: 1040px;
  background-color: ${(props) => props.theme.bgColor};
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  color: ${(props) => props.theme.defaultTextColor};
  a {
    /* -webkit-any-link 스타일 재정의 */
    color: inherit;
    text-decoration: none;
    cursor: pointer;

    &:-webkit-any-link {
      color: inherit;
      text-decoration: none;
      cursor: pointer;
    }
  }
`;

function Wrapper({children}: WrapperProps) {
  return (
    <Styled>
      {children}
    </Styled>
  );
}

export default Wrapper;
