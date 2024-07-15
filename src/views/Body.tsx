import styled from "styled-components";
import Sidebar from "./Sidebar";
import Content from "./Content";

const Container = styled.div`
  display: flex;
  height: calc(100vh - 160px);
  min-height: 450px;
`;

function Body() {
  return (
    <Container>
      <Sidebar />
      <Content />
    </Container>
  );
}

export default Body;
