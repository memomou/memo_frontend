import styled from "styled-components";

export const SideBarContainer = styled.div`
  display: flex;
  flex: 1;
  flex-grow: 1;
  flex-direction: column;
  padding: 20px;
  max-width: 250px;
  min-width: 220px;

  .nickname {
    height: 40px;
    font-size: 1.5rem;
    font-weight: bold;
    margin-bottom: 20px;
  }

  .category {
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
  }

  .category.plus {
    display: flex;
    justify-content: center;
    align-items: center;
    &:hover {
      background-color: #c7ffcc;
    }
    height: 26px;
  }

  .category.categoryInsert {
    display: flex;
    flex-direction: row;
    gap: 5px;
    background: cornsilk;
    height: 40px;
    .categoryInput {
      flex: 1;
      width: 0px;
      transition: width 0.5s ease;
      border: 1px solid #ddd;
      background-color: white;
      padding-left: 5px;
      height: 30px;
    }
    button {
      background-color: ${(props) => props.theme.SideBarbgColor};
      color: white;
      border: none;
      border-radius: 5px;
      padding: 5px;
      cursor: pointer;
      transition: 0.3s;
      width: 25px;
      transition: transform 0.1s, background-color 0.3s ease;
    }
  }

  @keyframes shake {
    0% { transform: translateX(0); }
    25% { transform: translateX(-5px); }
    50% { transform: translateX(5px); }
    75% { transform: translateX(-5px); }
    100% { transform: translateX(0); }
  }

  /* 흔들리는 효과가 추가된 클래스 */
  .shake {
    animation: shake 0.2s; /* 0.5초 동안 흔들리게 설정 */
    background-color: red !important;
  }
  .category.categoryInsert.invisible {
    display: none;
  }

  .selected {
    background-color: #e6f3ff;
  }
`;
