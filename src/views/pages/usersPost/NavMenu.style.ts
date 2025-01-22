import styled from "styled-components";
import { media } from "../../../styles";

export const NavMenuWrapper = styled.div`
  display: none;
  flex-direction: column;
  background-color: #f3f3f3;
  .container1 {
    z-index: 1000;
    background-color: #f3f3f3;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
  }
  ${media.mobile} {
    display: flex;
  }
  a {
    text-decoration: none;
    display: block;
  }

  ul {
    list-style-type: none;
    margin: 0;
  }

  .hamburger {
    position: relative;
    width: 30px;
    height: 20px;
    cursor: pointer;
    user-select: none;

    .meat {
      border-radius: 2px;
      width: 100%;
      position: absolute;
      height: 3px;
      background: #aaa;
      display: block;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

      &:first-child {
        top: 0;
      }

      &:nth-child(2),
      &:nth-child(3) {
        top: 50%;
        transform: translateY(-50%);
      }

      &:last-child {
        bottom: 0;
      }
    }
  }

  .close {
    .meat:first-child,
    .meat:last-child {
      opacity: 0;
    }

    .meat:first-child {
      transform: translateY(20px) scale(0);
    }

    .meat:last-child {
      transform: translateY(-20px) scale(0);
    }

    .meat:nth-child(2) {
      transform: rotate(45deg);
    }

    .meat:nth-child(3) {
      transform: rotate(-45deg);
    }
  }
`;

interface NavLinksProps {
  $itemCount: number;
}

export const NavLinks = styled.div<NavLinksProps>`
  display: flex;
  flex-direction: column;
  max-height: 0px;
  overflow: hidden;
  transition: max-height 0.3s
  ease-in-out;
  padding-left: 10px;
  &.active {
    max-height: ${props => `${props.$itemCount * 44 }px`};
  }

  ul {
    a {
      padding: 7px;
    }
  }
`;


