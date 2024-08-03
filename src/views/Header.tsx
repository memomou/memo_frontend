import { Link } from "react-router-dom";
import styled from "styled-components";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { userAtom } from "../components/atom/atoms";
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
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

const StyledLink = styled(Link)<{ selected?: boolean }>`
  text-decoration: none;
  cursor: ${(props) => (props.selected ? "not-allowed" : "pointer")};
  pointer-events: ${(props) => (props.selected ? "none" : "auto")};
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${(props) => (props.selected ? "gray" : "black")};
  background-color:
    ${(props) => {
      if (props.selected) {
        return "#f1f1f1";
      } else {
        return "white";
      }
    }
  };
  border: 1px solid black;
`;

function Header() {
  const location = useLocation();
  const user = useRecoilValue(userAtom);
  console.log(user);
  return (
    <Container>
      <HomeButton to="/">Home</HomeButton>
      <Title>타이틀</Title>
        <Action>
            {user.isLogin ? (
              <StyledLink to="/mypage" selected={location.pathname === '/mypage'}>{user.nickname}</StyledLink>
            ) : (
              <>
                <StyledLink to="/login" selected={location.pathname === '/login'}>로그인</StyledLink>
                <StyledLink to="/signup" selected={location.pathname === '/signup'}>회원가입</StyledLink>
              </>
            )}
        </Action>
    </Container>
  );
}
export default Header;
