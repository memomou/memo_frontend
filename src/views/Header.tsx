import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { userAtom } from "../components/atom/atoms";
import { DropdownMenu, MenuItem, StyledLink, StyledBtn, MenuItemLink } from "./Header.style";
import { useState } from "react";

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
  position: relative;
`;

const HomeButton = styled(Link)`
  display: flex;
  gap: 10px;
  margin-right: auto;
`;

function Header() {
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const location = useLocation();
  const user = useRecoilValue(userAtom);
  const setUser = useSetRecoilState(userAtom);

  const toggleDropdown = () => {
    setDropdownVisible(!isDropdownVisible);
  };

  const navigate = useNavigate();
  const navigateToFn = (path: string) => {
    return () => {
      setDropdownVisible(false);
      navigate(path);
    }
  }

  const handleLogout = () => {
    console.log('Logout');
    setDropdownVisible(false);
    setUser(undefined);
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    navigate('/');
  };

  console.log(user);
  return (
    <Container>
      <HomeButton to="/">Home</HomeButton>
      <Title>타이틀</Title>
      <Action>
        {user ? (
          <>
            <StyledBtn onClick={toggleDropdown}>
              {user.nickname}
            </StyledBtn>
            <DropdownMenu $isVisible={isDropdownVisible}>
              <MenuItem onClick={navigateToFn(`/user/${user.id}`)} >
                개인 블로그
              </MenuItem>
              <MenuItem onClick={navigateToFn(`/user/setting`)}>
                개인 설정
              </MenuItem>
              <MenuItem onClick={handleLogout}>로그아웃</MenuItem>
            </DropdownMenu>
          </>
        ) : (
          <>
            <StyledLink to="/login" selected={location.pathname === "/login"}>
              로그인
            </StyledLink>
            <StyledLink to="/signup" selected={location.pathname === "/signup"}>
              회원가입
            </StyledLink>
          </>
        )}
      </Action>
    </Container>
  );
}
export default Header;
