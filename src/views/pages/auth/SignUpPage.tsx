import { useState } from "react";
import CenterForm from "../../../components/Form.style";
import { useSetRecoilState } from "recoil";
import { userAtom } from "../../../components/atom/atoms";
import { useNavigate } from "react-router-dom";
import { Styled } from "./authPage.style";
import { axiosInstance } from '../../../helpers/helper';

function SignUpPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState("");
  const setUser = useSetRecoilState(userAtom);
  const navigate = useNavigate();

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
      setUser({...response.data.user});
      localStorage.setItem('accessToken', response.data.token.accessToken);
      localStorage.setItem('refreshToken', response.data.token.refreshToken);
      navigate('/');
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
        <div className="additional-options">
          <a href="/login">이미 계정이 있으신가요? 로그인</a>
        </div>
      </CenterForm>
    </Styled>
  );
}

export default SignUpPage;
