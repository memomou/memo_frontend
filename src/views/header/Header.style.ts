import styled, {css} from "styled-components";
import { Link } from "react-router-dom";


interface DropdownMenuProps {
  $isVisible: boolean;
}

interface StyledProps {
  selected?: boolean;
}

export const MenuItem = styled.div``;

export const DropdownMenu = styled.div<DropdownMenuProps>`
  position: absolute;
  top: 105%; /* 부모 요소 아래에 위치하게 함 */
  right: 0;
  background-color: white;
  border: 1px solid #ddd;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  min-width: 141px;
  z-index: 1000;
  color: black;
  display: ${(props) => (props.$isVisible ? 'flex' : 'none')};
  flex-direction: column;
  ${MenuItem} {
    width: 100%;
    font-size: 1.2rem;
    padding: 10px 20px;
    text-align: center;
    cursor: pointer;
    &:hover {
      background-color: #f0f0f0;
    }
    text-decoration: none;
    color: black;
  }
`;

export const Title = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-size: 24px;
  font-weight: bold;
`;

export const StyledBase = css<StyledProps>`
  height: 100%;
  padding: 4px 10px;
  text-decoration: none;
  font-size: 1.0rem;
  cursor: ${(props) => (props.selected ? "not-allowed" : "pointer")};
  pointer-events: ${(props) => (props.selected ? "none" : "auto")};
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${(props) => (props.selected ? "gray" : "black")};
  background-color: ${(props) => (props.selected ? "#f1f1f1" : "white")};
  position: relative;
  border-radius: 20px;
  border: 1px solid #ababab;
`;

export const StyledLink = styled(Link)<{ selected?: boolean }>`
  ${StyledBase}
`;

export const StyledBtn = styled.button<{ selected?: boolean }>`
  ${StyledBase}
`;

export const HomeButton = styled(Link)``;

export const Action = styled.div``;

export const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* height: 60px; */
  background-color: ${(props) => props.theme.headerbgColor};
  color: ${(props) => props.theme.headerTextColor};
  border-bottom: 2px solid #ddd;
  padding: 10px 10px;


  .profileBtn {
    min-width: 50px;
  }

  ${HomeButton} {
    display: flex;
    justify-content: center;  /* 가로 중앙 정렬 */
    align-items: center;
    /* gap: 10px; */
    /* margin-right: auto; */
    font-size: 1.4rem;
    font-weight: bold;
    background-color: ${(props) => props.theme.headerbgColor};
    color: ${(props) => props.theme.headerTextColor};
    height: 1.6rem;
    .logo {
      height: 100%;
      margin-right: 5px;
    }
  }

  ${Action} {
    display: flex;
    gap: 10px;
    /* margin-left: auto; */
    position: relative;
    ${StyledBtn} {
    }
    ${DropdownMenu} {
      ${MenuItem} {
      }
    }
  }
`;
