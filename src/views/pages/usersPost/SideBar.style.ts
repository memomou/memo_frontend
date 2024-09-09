import styled from "styled-components";

export const SideBarContainer = styled.div`
  display: flex;
  flex: 1;
  flex-grow: 1;
  flex-direction: column;
  padding: 20px;

  .nickname {
    height: 40px;
    font-size: 1.5rem;
    font-weight: bold;
    margin-bottom: 20px;
  }

  .category {
    padding: 10px;
    font-size: 1.0rem;
    font-weight: bold;
    margin-bottom: 10px;
    border-radius: 10px;
    /* background-color: ${(props) => props.theme.SideBarbgColor}; */
    cursor: pointer;
    transition: 0.3s;
    border: 1px solid #ddd;
    &:hover {
      background-color: ${(props) => props.theme.SideBarbgColor};
    }
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }
  .selected {
    background-color: ${(props) => props.theme.SideBarbgColor};
  }
`;
