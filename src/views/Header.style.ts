import styled, {css} from "styled-components";
import { Link } from "react-router-dom";

interface DropdownMenuProps {
  $isVisible: boolean;
}

export const DropdownMenu = styled.div<DropdownMenuProps>`
  position: absolute;
  top: 100%; /* 부모 요소 아래에 위치하게 함 */
  right: 0;
  background-color: white;
  border: 1px solid #ddd;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  min-width: 100px;
  z-index: 1000;
  color: black;
  display: ${(props) => (props.$isVisible ? 'flex' : 'none')};
  flex-direction: column;
`;

export const MenuItemStyle = css`
  padding: 6px;
  cursor: pointer;
  &:hover {
    background-color: #f0f0f0;
  }
  text-decoration: none;
  color: black;
  font-size: 14px;
`;

export const MenuItem = styled.div`
  ${MenuItemStyle}
`;

export const MenuItemLink = styled(Link)`
  ${MenuItemStyle}
`;

interface StyledProps {
  selected?: boolean;
}

export const StyledBase = css<StyledProps>`
  height: 35px;
  text-decoration: none;
  cursor: ${(props) => (props.selected ? "not-allowed" : "pointer")};
  pointer-events: ${(props) => (props.selected ? "none" : "auto")};
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${(props) => (props.selected ? "gray" : "black")};
  background-color: ${(props) => (props.selected ? "#f1f1f1" : "white")};
  border: 1px solid black;
  position: relative
`;

export const StyledLink = styled(Link)<{ selected?: boolean }>`
${StyledBase}
`;

export const StyledBtn = styled.button<{ selected?: boolean }>`
${StyledBase}
`;
