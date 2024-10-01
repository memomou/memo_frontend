import styled from "styled-components";

export const CategoryItemStyle = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  font-size: 1.0rem;
  font-weight: bold;
  margin-bottom: 10px;
  height: 31px;
  align-items: center;
  cursor: pointer;
  /* transition: 0.3s; */


  .buttonWrapper {
    display: flex;
    flex: 1;
    height: 100%;
    flex-direction: row;
    justify-content: space-between;
    font-size: 1.0rem;
    font-weight: bold;
    border: 1px solid #ddd;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    &:hover {
    border: 1px solid rgba(52, 152, 219, 0.8);
    }
  }

  &:hover .dragButton {
    opacity: 0.5;
  }

  & .hidden {
    visibility: hidden;
  }

  .categoryName {
    padding: 2px 2px 2px 10px;
    display: flex;
    align-items: center;
    height: 100%;
    flex: 1;
  }

  .dragButton {
    margin-left: 2px;
    transition: opacity 0.3s;
    opacity: 0;
    padding: 4px 0px;
    border-radius: 4px;
    cursor: grab;
    &:active {
      cursor: grabbing;
    }
    &:hover {
      background-color: #cecece;
    }
  }

  .category.categoryInsert {
    display: flex;
    flex-direction: row;
    gap: 5px;
    background: cornsilk;
    height: 40px;
    align-items: center;
    padding: 2px 5px;
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

  /* 흔들리는 효과가 추가된 클래스 */
  .shake {
    animation: shake 0.2s; /* 0.5초 동안 흔들리게 설정 */
    background-color: red !important;
  }
  .category.categoryInsert.invisible {
    display: none;
  }

  @keyframes shake {
    0% { transform: translateX(0); }
    25% { transform: translateX(-5px); }
    50% { transform: translateX(5px); }
    75% { transform: translateX(-5px); }
    100% { transform: translateX(0); }
  }

`;