import { useState } from "react";
import styled from "styled-components";

const Styled = styled.div`
  display: flex;
  height: 100%;
  flex: 1;
  background-color: ${(props) => props.theme.ContentbgColor};
`;

function Content() {
  const [posts, setPosts] = useState('');
  return (
    <Styled>
      Content
    </Styled>
  );
}

export default Content;
