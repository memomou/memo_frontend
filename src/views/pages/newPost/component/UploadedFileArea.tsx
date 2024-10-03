import React from 'react';
import { PostFile } from '../../../../components/atom/atoms';
import { formatFileSize, formatDate } from '../../../../utils/formatters';
import { UploadedFileArea as StyledUploadedFileArea } from './UploadedFileArea.style';
import { axiosInstance } from '../../../../helpers/helper';

interface UploadedFileAreaProps {
  uploadedFiles: PostFile[];
  postId: string;
  setUploadedFiles: React.Dispatch<React.SetStateAction<PostFile[]>>;
}



const UploadedFileArea: React.FC<UploadedFileAreaProps> = ({ uploadedFiles, postId, setUploadedFiles }) => {
  if (uploadedFiles.length === 0) return null;

  const handleFileDelete = async (event: React.MouseEvent, fileId: number) => {
    try {
      event.preventDefault();
      if (window.confirm('정말로 이 파일을 삭제하시겠습니까?')) {
        await axiosInstance.delete(`/posts/${postId}/files/${fileId}`);
        setUploadedFiles(prevFiles => prevFiles.filter(file => file.id !== fileId));
      }
    } catch (error) {
      console.error("파일 삭제 실패:", error);
    }
  };

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
            <button onClick={(e) => handleFileDelete(e, file.id)} className="delete-button">
              &#10005; {/* X 표시 */}
            </button>
          </div>
        ))}
      </div>
    </StyledUploadedFileArea>
  );
};

export default UploadedFileArea;
