import styled from "styled-components";
import { useState } from "react";
import CenterForm from "../../../components/Form.style";
import { Styled } from "./authPage.style";
import { useSetRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import { userAtom } from "../../../components/atom/atoms";
import { axiosInstance } from '../../../helpers/helper';

function SignupPage(props: any) {
  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const setUser = useSetRecoilState(userAtom);
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const response = await axiosInstance.post(`/auth/register/email`, {
        email,
        password,
        nickname,
      });
      console.log('회원가입 완료:', response.data);
      setUser({...response.data.user});
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
        <h1>회원가입</h1>
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
          <span>닉네임</span>
          <input
            type="nickname"
            id="nickname"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
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
        <button type="submit">Submit</button>
      </CenterForm>
    </Styled>
  );
}

export default SignupPage;
