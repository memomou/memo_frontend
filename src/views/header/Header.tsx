import { Link, useNavigate } from "react-router-dom";
import {
  useLocation,
} from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { userAtom } from "../../components/atom/atoms";
import { DropdownMenu, MenuItem, StyledLink, StyledBtn, HeaderContainer, HomeButton, Action } from "./Header.style";
import { useEffect, useRef, useState } from "react";

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

  return (
    <HeaderContainer>
      {/* // https://www.onlinewebfonts.com/icon/80555 */}

      <HomeButton to="/">
        <img className="logo" src="/catQuestionLogo.svg" alt="logo" />
      <span>Memou</span></HomeButton>
      <Action>
        {user ? (
          <>
        {
          location.pathname !== "/post/write" && (
            <StyledBtn>
              <Link to="/post/write">
                새 글 작성
              </Link>
            </StyledBtn>
          )
        }
            <StyledBtn ref={profileBtnRef} className='profileBtn'>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" fill="currentColor">
                <circle cx="12" cy="8" r="4" fill="currentColor" />
                <path d="M12 12c-3.87 0-7 3.13-7 7h14c0-3.87-3.13-7-7-7z" fill="currentColor"/>
              </svg>
              <span>{user.nickname} 님</span>
            </StyledBtn>
            <DropdownMenu $isVisible={isDropdownVisible} ref={dropdownRef}>
              <MenuItem onClick={navigateToFn(`/${user.nickname}`)} >
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
    </HeaderContainer>
  );
}
export default Header;
