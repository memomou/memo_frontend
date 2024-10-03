import styled from "styled-components";

export const FileUploadArea = styled.div<{ $isDragging: boolean; $uploadProgress: number; $uploadStatus: string }>`
  border: 2px dashed ${props => props.$isDragging ? '#12b886' : '#ccc'};
  border-radius: 5px;
  padding: 15px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s;
  font-size: 0.85rem;
  background-color: ${props =>
    props.$isDragging ? '#e6f8f3' :
    props.$uploadStatus === 'complete' ? '#e6f8e6' : 'transparent'};
  color: ${props =>
    props.$isDragging ? '#12b886' :
    props.$uploadStatus === 'complete' ? '#28a745' : 'inherit'};
  position: relative;
  overflow: hidden;
  margin-top: 10px;
  margin-bottom: 10px;

  &:hover {
    background-color: #f0f0f0;
  }

  &::before {
    content: '';
    position: absolute;
    left: 0;
    bottom: 0;
    height: 4px;
    width: ${props => props.$uploadProgress}%;
    background-color: ${props =>
      props.$uploadStatus === 'complete' ? '#28a745' : '#12b886'};
    transition: width 0.3s ease-in-out;
  }
`;
