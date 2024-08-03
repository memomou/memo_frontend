import styled from "styled-components";
import { useState } from "react";
import axios from "axios";
import config from "../../config";
import CenterForm from "../../components/Form.style";
const Styled = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  background-color: ${(props) => props.theme.ContentbgColor};
`;

function SignupPage(props: any) {
  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const response = await axios.post(`${config.backendUri}/auth/register/email`, {
        email,
        password,
        nickname,
      });
      console.log('Login Successful:', response.data);
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
