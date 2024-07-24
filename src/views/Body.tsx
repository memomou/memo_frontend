import styled from "styled-components";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Root from "./pages/Root";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignUpPage";

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
        <Routes>
          <Route path="/" element={<Root/>} />
          <Route path="/login" element={<LoginPage/>} />
          <Route path="/signup" element={<SignupPage/>} />
        </Routes>
    </Container>
  );
}

export default Body;
