import { useState } from "react";
import CenterForm from "../../../components/Form.style";
import { Link } from "react-router-dom";
import { LoginPageWrapper } from "./LoginPage.style";
import { axiosInstance } from '../../../helpers/helper';
import { GoogleLoginButton } from "./LoginButton/GoogleLoginButton";
import { GoogleOAuthProvider } from "@react-oauth/google";
import config from '../../../config';
import { useLogin } from "./useAuth";
function LoginPage(props: any) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { handleUserLogin } = useLogin();
  console.log('tetst',config.googleClientId);

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
      handleUserLogin(response.data);

    } catch (error) {
      alert("로그인에 실패했습니다. 이메일과 비밀번호를 확인해주세요.");
      console.error("Login Failed1ddd:", error);
    }
  };

  return (
    <LoginPageWrapper>
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
        <div className="or-text">또는</div>
        <GoogleOAuthProvider clientId={config.googleClientId}>
          <GoogleLoginButton userLogin={handleUserLogin} />
        </GoogleOAuthProvider>
        <div className="additional-options">
          <Link to="/signup">계정이 없으신가요? 회원가입</Link>
        </div>
      </CenterForm>
    </LoginPageWrapper>
  );
}

export default LoginPage;
