import styled from "styled-components";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Root from "./pages/root/Root";
import LoginPage from "./pages/auth/LoginPage";
import SignupPage from "./pages/auth/SignUpPage";
import PosterPostPage from "./pages/newPost/PosterPostPage";

const Container = styled.div`
  display: flex;
  flex: 1;
  background-color: ${(props) => props.theme.ContentbgColor};
`;

function Body() {
  return (
    <Container>
        <Routes>
          <Route path="/" element={<Root/>} />
          <Route path="/login" element={<LoginPage/>} />
          <Route path="/signup" element={<SignupPage/>} />
          <Route path="/post/new" element={<PosterPostPage/>} />
        </Routes>
    </Container>
  );
}

export default Body;
