import { ReactNode } from 'react';

import styled from "styled-components";

interface WrapperProps {
  children: ReactNode;
}

const Styled = styled.div`
  margin: 0 auto;
  min-width: 250px;
  max-width: 600px;
  background-color: ${(props) => props.theme.bgColor};
`;

function Wrapper({children}: WrapperProps) {
  return (
    <Styled>
      {children}
    </Styled>
  );
}

export default Wrapper;
