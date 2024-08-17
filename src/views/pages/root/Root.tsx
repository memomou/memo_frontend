import styled from "styled-components";
import Content from "./Content";

const Styled = styled.div`
  flex: 1;
`;

function Root() {
  return (
    <Styled>
      <Content />
    </Styled>
  );
}

export default Root;
