import styled from "styled-components";

const Styled = styled.div`
  width: 120px;
  background-color: ${(props) => props.theme.SideBarbgColor};
  border-left: 1px solid black;
  border-right: 1px solid black;
`;

function Sidebar() {
  return ( <Styled>Sidebar</Styled>);
}

export default Sidebar;
