import { Link } from "react-router-dom";
import styled from "styled-components";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
  font-size: 2rem;
  background-color: ${(props) => props.theme.headerbgColor};
  color: ${(props) => props.theme.headerTextColor};
  border: 1px solid black;
  padding: 10px 10px;
`;

const Title = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-size: 24px;
  font-weight: bold;
`;

const Action = styled.div`
  display: flex;
  gap: 10px;
  margin-left: auto;
`;

const HomeButton = styled(Link)`
  display: flex;
  gap: 10px;
  margin-right: auto;
`;

const ActionButton = styled.button`
  padding: 5px 5px;
  font-size: 15px;
  cursor: pointer;
`;

function Header() {
  return (
    <Container>
      <HomeButton to="/">Home</HomeButton>
      <Title>타이틀</Title>
      <Routes>
        <Route
          path="/"
          element={
            <Action>
              <ActionButton>
                <Link to="/login">로그인</Link>
              </ActionButton>
              <ActionButton>
                <Link to="/signup">회원가입</Link>
              </ActionButton>
            </Action>
          }
        />
        <Route
          path="/login"
          element={
            <ActionButton>
              <Link to="/signup">회원가입</Link>
            </ActionButton>
          }
        />
        <Route
          path="/signup"
          element={
            <ActionButton>
            <Link to="/login">로그인</Link>
          </ActionButton>
          }
        />
      </Routes>
    </Container>
  );
}
export default Header;
