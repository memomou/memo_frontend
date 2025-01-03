import { useState } from "react";
import CenterForm from "../../../components/Form.style";
import { useSetRecoilState } from "recoil";
import { userAtom } from "../../../components/atom/atoms";
import { useNavigate } from "react-router-dom";
import { Styled } from "./authPage.style";
import { axiosInstance } from '../../../helpers/helper';
import { useLocation } from 'react-router-dom';
import { GoogleLoginButton } from "./LoginButton/GoogleLoginButton";
import { GoogleOAuthProvider } from "@react-oauth/google";
import config from '../../../config';
function LoginPage(props: any) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const setUser = useSetRecoilState(userAtom);
  const navigate = useNavigate();
  const location = useLocation();
  console.log('tetst',config.googleClientId);
  const handleUserLogin = (data: any) => {
    setUser(data.user);
    localStorage.setItem('accessToken', data.token.accessToken);
    localStorage.setItem('refreshToken', data.token.refreshToken);
    console.log('location.state', location.state);
    const from = location.state?.from?.pathname || '/';
    const search = location.state?.from?.search || '';
    navigate(`${from}${search}`);
  };
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await axiosInstance.post(
        `/auth/login/email`,
        {
          email,
          password,
        }
      );
      console.log('Login Successful:', response);
      handleUserLogin(response.data.user);

    } catch (error) {
      alert("로그인에 실패했습니다. 이메일과 비밀번호를 확인해주세요.");
      console.error("Login Failed1ddd:", error);
    }
  };

  return (
    <Styled>
      <CenterForm onSubmit={handleSubmit}>
        <h1 className="login-title">로그인</h1>
        <div className="input-group">
          <label htmlFor="email">이메일</label>
          <input
            type="email"
            id="email"
            placeholder="example@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="password">비밀번호</label>
          <input
            type="password"
            id="password"
            placeholder="비밀번호를 입력하세요"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="login-button">로그인</button>
        <GoogleOAuthProvider clientId={config.googleClientId}>
          <GoogleLoginButton userLogin={handleUserLogin} />
        </GoogleOAuthProvider>
        <div className="additional-options">
          <a href="/signup">계정이 없으신가요? 회원가입</a>
        </div>
      </CenterForm>
    </Styled>
  );
}

export default LoginPage;
