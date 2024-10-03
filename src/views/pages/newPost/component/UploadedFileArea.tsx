import React from 'react';
import { PostFile } from '../../../../components/atom/atoms';
import { formatFileSize, formatDate } from '../../../../utils/formatters';
import { UploadedFileArea as StyledUploadedFileArea } from './UploadedFileArea.style';

interface UploadedFileAreaProps {
  uploadedFiles: PostFile[];
  onFileDelete: (event: React.MouseEvent, fileId: number) => void;
}

const UploadedFileArea: React.FC<UploadedFileAreaProps> = ({ uploadedFiles, onFileDelete }) => {
  if (uploadedFiles.length === 0) return null;

  return (
    <StyledUploadedFileArea>
      <h4>업로드된 파일</h4>
      <div className="uploaded-files">
        {uploadedFiles.map((file) => (
          <div key={file.id} className="file-item">
            <a href={file.url} download={file.originalFilename} className="file-name">
              {file.originalFilename}
            </a>
            <span className="file-info">
              {formatFileSize(file.fileSize)} | {formatDate(file.createdAt)}
            </span>
            <button onClick={(e) => onFileDelete(e, file.id)} className="delete-button">
              &#10005; {/* X 표시 */}
            </button>
          </div>
        ))}
      </div>
    </StyledUploadedFileArea>
  );
};

export default UploadedFileArea;
