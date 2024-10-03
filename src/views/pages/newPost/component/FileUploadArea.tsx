import React, { useCallback } from 'react';
import { FileUploadArea as StyledFileUploadArea } from './FileUploadArea.style';
import { PostFile, PostStatus, PostType } from '../../../../components/atom/atoms';
import { useFileUpload } from '../../../../hooks/useFileUpload';
import { Editor } from 'slate';
import { handlePostSubmission } from '../PosterPostPage.fn';
import { useNavigate } from 'react-router-dom';

interface FileUploadAreaProps {
  post: PostType;
  editor: Editor;
  setUploadedFiles: React.Dispatch<React.SetStateAction<PostFile[]>>;
}

export const FileUploadArea: React.FC<FileUploadAreaProps> = ({
  post,
  editor,
  setUploadedFiles,
}) => {

  const {
    uploadStatus,
    uploadProgress,
    isDragging,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    handleFileUpload,
  } = useFileUpload(setUploadedFiles);

  const navigate = useNavigate();

    // 파일 업로드 관련 처리
  const onFileUpload = useCallback(async(files: FileList | null) => {
    if (!post.id) {
      const UpdatedPost = await handlePostSubmission(post, editor, PostStatus.UNREGISTERED);
      const {id: fetchedPostId} = UpdatedPost;
      navigate(`/post/write?postId=${fetchedPostId}`);
      handleFileUpload(files, fetchedPostId);
    } else {
      handleFileUpload(files, post.id);
    }
  }, [post.id, handleFileUpload, navigate]);

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
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={(e) => handleDrop(e, post.id)}
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
