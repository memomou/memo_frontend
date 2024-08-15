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
import { DropdownMenu, MenuItem, StyledLink, StyledBtn, Container, HomeButton, Title, Action } from "./Header.style";
import { ButtonHTMLAttributes, useEffect, useRef, useState } from "react";

function Header() {
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const profileBtnRef = useRef<HTMLButtonElement>(null);
  const location = useLocation();
  const user = useRecoilValue(userAtom);
  const setUser = useSetRecoilState(userAtom);

  const navigate = useNavigate();
  const navigateToFn = (path: string) => {
    return () => {
      navigate(path);
    }
  }

  const handleLogout = () => {
    console.log('Logout');
    setUser(undefined);
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    navigate('/');
  };

  const handleClickOutside = (event: MouseEvent) => {
    // 프로필 버튼이 아닌 다른 곳을 클릭하면 드롭다운 메뉴를 닫음
    if ((profileBtnRef.current && profileBtnRef.current.contains(event.target as Node))) {
      setDropdownVisible((current)=>!current);
    } else {
      setDropdownVisible(false);
    }
  };

  useEffect(() => {
    // 클릭 이벤트 리스너 추가
    document.addEventListener('click', handleClickOutside);

    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    console.log('isDropdownVisible changed:', isDropdownVisible);
  }, [isDropdownVisible]);
  return (
    <Container>
      <HomeButton to="/">MEMO LOG</HomeButton>
      <Action>
        {user ? (
          <>
            <StyledLink to="/post/new">
              새 글 작성
            </StyledLink>
            <div>
            <StyledBtn ref={profileBtnRef}>
              {user.nickname}
            </StyledBtn>
            <DropdownMenu $isVisible={isDropdownVisible} ref={dropdownRef}>
              <MenuItem onClick={navigateToFn(`/user/${user.id}`)} >
                개인 블로그
              </MenuItem>
              <MenuItem onClick={navigateToFn(`/user/setting`)}>
                개인 설정
              </MenuItem>
              <MenuItem onClick={handleLogout}>로그아웃</MenuItem>
            </DropdownMenu>
            </div>
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
