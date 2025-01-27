import { Link, useNavigate } from "react-router-dom";
import {
  useLocation,
} from "react-router-dom";
import { useRecoilState } from "recoil";
import { authorAtom, userAtom } from "../../components/atom/atoms";
import { DropdownMenu, MenuItem, StyledLink, StyledBtn, HeaderContainer, HomeButton, Action } from "./Header.style";
import { useEffect, useRef, useState } from "react";
import { useAuthorInfo } from "../../hooks/useAuthorInfo";

function Header() {
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const profileBtnRef = useRef<HTMLButtonElement>(null);
  const {pathname, search} = useLocation();
  const paths = pathname.split('/');
  console.log('paths', paths);
  const authorNickname = ['user', 'setting', 'post'].includes(paths[1])
    ? ''
    : paths[1];
  console.log('authorNickname', authorNickname);
  const { author } = useAuthorInfo(authorNickname);
  const [user, setUser] = useRecoilState(userAtom);
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
      <div className="header-left">
        <HomeButton to="/">
          <img className="logo" src="/catQuestionLogo.svg" alt="logo" />
        </HomeButton>
        <Link to={`/${authorNickname}`}>
          <span className="title">{(author?.nickname && `${author?.nickname}`) || 'Memou'}</span>
        </Link>
      </div>

      <Action>
        {user ? (
          <>
        {
          pathname !== "/post/write" && user.id === author?.id && (
            <button className="writebtn px-1 border border-gray-300 rounded-md bg-gray-50 border-solid">
              <Link to="/post/write" >
                새 글 작성
              </Link>
            </button>
          )
        }
            <button ref={profileBtnRef} className='profileBtn'>
              <img
                src={user?.profileImage?.url || '/defaultAvatar.png'}
                className="profileImage"
                alt={``}
              />
            </button>
            <DropdownMenu $isVisible={isDropdownVisible} ref={dropdownRef}>
              <MenuItem className="write" onClick={navigateToFn(`/post/write`)} >
                새 글 작성
              </MenuItem>
              <MenuItem onClick={navigateToFn(`/${user.nickname}`)} >
                개인 블로그
              </MenuItem>
              <MenuItem onClick={navigateToFn(`/user/setting/profile`)}>
                개인 설정
              </MenuItem>
              <MenuItem onClick={navigateToFn(`/${user.nickname}/posts/saves`)}>
                임시글
              </MenuItem>
              <MenuItem onClick={handleLogout}>로그아웃</MenuItem>
            </DropdownMenu>
          </>
        ) : (
          <>
            <StyledLink
              to="/login"
              selected={pathname === "/login"}
              state={{ from: { pathname, search }}}
              replace
            >
              로그인
            </StyledLink>
          </>
        )}
      </Action>
    </HeaderContainer>
  );
}
export default Header;
