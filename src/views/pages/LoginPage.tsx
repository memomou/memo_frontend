import styled from "styled-components";
import { useState } from "react";
import axios from "axios";
import config from "../../config";
import CenterForm from "../../components/Form.style";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { userAtom } from "../../components/atom/atoms";

const Styled = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  flex: 1;
  background-color: ${(props) => props.theme.ContentbgColor};
`;

function LoginPage(props: any) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
const setUser = useSetRecoilState(userAtom);
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
        <button type="submit">Submit</button>
      </CenterForm>
    </Styled>
  );
}

export default LoginPage;
