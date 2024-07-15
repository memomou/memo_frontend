import styled from "styled-components";

const Styled = styled.div`
  display: flex;
  flex-direction: column;
  width: 120px;
  background-color: ${(props) => props.theme.SideBarbgColor};
  border-left: 1px solid black;
  border-right: 1px solid black;
  ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
    li {
      padding: 10px;
      text-align: center;
      border-bottom: 1px solid black;
    }
  }
`;

function Sidebar() {
  return (
  <Styled>
      <ul>
        <li>Home</li>
        <li>Profile</li>
        <li>Settings</li>
      </ul>
  </Styled>);
}

export default Sidebar;
