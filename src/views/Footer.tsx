import styled from "styled-components";

const Styled = styled.footer`
  height: 60px;
  background-color: ${(props) => props.theme.FooterbgColor};
  border-top: 2px solid #ddd;
  margin-top: 10px;
`;

function Footer() {
  return (
    <Styled>
    </Styled>
  );
}

export default Footer;
