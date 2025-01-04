import { useState } from "react";
import CenterForm from "../../../components/Form.style";
import { Link } from "react-router-dom";
import { Styled } from "./SignUpPage.style";
import { axiosInstance } from '../../../helpers/helper';
import { GoogleOAuthProvider } from "@react-oauth/google";
import { GoogleLoginButton } from "./LoginButton/GoogleLoginButton";
import config from "../../../config";
import { useLogin } from "./useAuth";
function SignUpPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState("");
  const { handleUserLogin } = useLogin();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }
    try {
      const response = await axiosInstance.post(`/auth/register/email`, {
        email,
        password,
        nickname: username,
      });
      console.log('회원가입 완료:', response.data);
      handleUserLogin(response.data.user);
    } catch (error) {
      console.error("회원가입 오류:", error);
      alert("회원가입에 실패했습니다. 다시 시도해 주세요.");
    }
  };

  return (
    <Styled>
      <CenterForm onSubmit={handleSubmit}>
        <h1 className="signup-title">회원가입</h1>
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
          <label htmlFor="username">닉네임</label>
          <input
            type="text"
            id="username"
            placeholder="닉네임을 입력해주세요"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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
        <div className="input-group">
          <label htmlFor="confirmPassword">비밀번호 확인</label>
          <input
            type="password"
            id="confirmPassword"
            placeholder="비밀번호를 다시 입력하세요"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="signup-button">회원가입</button>
        <div className="or-text">또는</div>
        <GoogleOAuthProvider clientId={config.googleClientId}>
          <GoogleLoginButton userLogin={handleUserLogin} />
        </GoogleOAuthProvider>
        <div className="additional-options">
          <Link to="/login">이미 계정이 있으신가요? 로그인</Link>
        </div>
      </CenterForm>
    </Styled>
  );
}

export default SignUpPage;
