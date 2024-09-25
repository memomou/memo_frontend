import styled from "styled-components";

export const SideBarContainer = styled.div`
  display: flex;
  flex: 1;
  flex-grow: 1;
  flex-direction: column;
  padding: 20px;
  max-width: 250px;
  min-width: 220px;

  .nicknameWrapper {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 14px;
    .nickname {
      margin: 0;
      font-size: 1.3rem;
    }
    .profileImage {
      width: 3rem;
      height: 3rem;
      border-radius: 50%;
      object-fit: cover;
    }
  }


  .category {
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
