import styled from "styled-components";
import { useState } from "react";
import axios from "axios";
import config from "../../config";
import CenterForm from "../../components/Form.style";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { userAtom } from "../../components/atom/atoms";
import { useNavigate } from "react-router-dom";
import { Styled } from "./authPage.style";

function LoginPage(props: any) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const setUser = useSetRecoilState(userAtom);
  const navigate = useNavigate();
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        `${config.backendUri}/auth/login/email`,
        {
          email,
          password,
        }
      );
      console.log('Login Successful:', response);
      setUser({...response.data.user, isLogin: true});
      localStorage.setItem('accessToken', response.data.token.accessToken);
      localStorage.setItem('refreshToken', response.data.token.refreshToken);
      navigate('/');
    } catch (error) {
      console.error("Login Failed:", error);
    }
  };

  return (
    <Styled>
      <CenterForm onSubmit={handleSubmit}>
        <h1>로그인</h1>
        <label>
          <span>아이디</span>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label>
          <span>패스워드</span>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button type="submit">로그인</button>
      </CenterForm>
    </Styled>
  );
}

export default LoginPage;
