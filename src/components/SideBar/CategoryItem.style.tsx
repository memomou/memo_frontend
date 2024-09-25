import styled from "styled-components";

export const CategoryItemStyle = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 2px 2px 2px 10px;
    font-size: 1.0rem;
    font-weight: bold;
    margin-bottom: 10px;
    border-radius: 10px;
    height: 31px;
    align-items: center;
    cursor: pointer;
    /* transition: 0.3s; */
    border: 1px solid #ddd;
    &:hover {
      border: 1px solid rgba(52, 152, 219, 0.8);
    }
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    .categoryName {
      display: flex;
      align-items: center;
      height: 100%;
      flex: 1;
    }

  .selected {
    background-color: #000;
  }
`;