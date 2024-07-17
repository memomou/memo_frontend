import styled from "styled-components";
import Sidebar from "./Sidebar";
import Content from "./Content";
import Form from "../components/Form";
import { RadiusText } from "../components/Text";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Root from "./pages/Root";

const Container = styled.div`
  display: flex;
  height: calc(100vh - 160px);
  min-height: 450px;

  border-left: 1px solid black;
  border-right: 1px solid black;
`;

function Body() {
  return (
    <Container>
      <Router>
        <Routes>
          <Route path="/" element={<Root/>} />
        </Routes>
      </Router>
    </Container>
  );
}

export default Body;
