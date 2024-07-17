import styled from "styled-components";
import { TextProps } from "../../components/Text";

const Styled = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  flex: 1;
  background-color: ${(props) => props.theme.ContentbgColor};
`;

const CenterForm = styled.form<TextProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding: 20px;
  border: 1px solid black;
  border-radius: 10px;
  background-color: white;
  label {
    display: flex;
    align-items: center;
    span {
      min-width: 80px;
    }
    input {
      background-color: ${(props) => props.$bgColor};
      height: ${(props) => props.$height ?? "15px"};
      width: ${(props) => props.$width ?? "100px"};
    }
  }
`;

function LoginPage(props: any) {
  return ( <Styled>
    <CenterForm $width="100px">
      <h1>로그인</h1>
        <label>
          <span>아이디</span>
          <input
          type="text" name="username" />
        </label>
        <label>
        <span>패스워드</span>
          <input type="password" name="password" />
        </label>
        <button style={
          {width : "100px", height : "30px"}
        } type="submit">Submit</button>
    </CenterForm>
  </Styled> );
}

export default LoginPage;