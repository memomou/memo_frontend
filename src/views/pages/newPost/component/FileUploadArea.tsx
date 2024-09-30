import React from 'react';
import { FileUploadArea as StyledFileUploadArea } from './FileUploadArea.style';

interface FileUploadAreaProps {
  onFileUpload: (files: FileList | null) => void;
  uploadStatus: 'idle' | 'uploading' | 'complete';
  uploadProgress: number;
  isDragging: boolean;
  onDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
  onDragLeave: () => void;
  onDrop: (e: React.DragEvent<HTMLDivElement>) => void;
}

export const FileUploadArea: React.FC<FileUploadAreaProps> = ({
  onFileUpload,
  uploadStatus,
  uploadProgress,
  isDragging,
  onDragOver,
  onDragLeave,
  onDrop,
}) => {
  const renderContent = () => {
    switch (uploadStatus) {
      case 'uploading':
        return `업로드 중... ${uploadProgress}% 완료`;
      case 'complete':
        return '업로드 완료!';
      default:
        return isDragging
          ? '파일을 여기에 놓으세요'
          : '파일을 추가하려면 여기에 드래그하거나 클릭하세요';
    }
  };

  return (
    <StyledFileUploadArea
      onClick={() => document.getElementById('fileInput')?.click()}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
      $isDragging={isDragging}
      $uploadProgress={uploadProgress}
      $uploadStatus={uploadStatus}
    >
      {renderContent()}
      <input
        id="fileInput"
        type="file"
        style={{ display: 'none' }}
        onChange={(e) => onFileUpload(e.target.files)}
      />
    </StyledFileUploadArea>
  );
};
