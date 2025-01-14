import styled from "styled-components";

export const SideBarWrapper = styled.div`
  width: 165px;
  height: 100%;
  background-color: ${({ theme }) => theme.slate50};
  padding: 20px;
  gap: 5rem;
  border-right: 1px solid ${({ theme }) => theme.slate300};
  ul {
    font-size: 1.2rem;
    color: #333;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    li.focus {
      cursor: pointer;
      color: ${({ theme }) => theme.blue700};
    }
  }
`;
