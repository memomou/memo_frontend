import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
  font-size: 2rem;
  background-color: ${(props) => props.theme.headerbgColor};
  color: ${(props) => props.theme.headerTextColor};
  border: 1px solid black;
  padding: 10px 10px;
`;

const Title = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-size: 24px;
  font-weight: bold;
`;

const Action = styled.div`
  display: flex;
  gap: 10px;
  margin-left: auto;
`
const ActionButton = styled.button`
  padding: 5px 5px;
  font-size: 15px;
  cursor: pointer;
`

function Header() {
  return ( <Container>
    <Title>타이틀</Title>
    <Action>
        <ActionButton>Login</ActionButton>
    </Action>
  </Container> );
}
export default Header;
