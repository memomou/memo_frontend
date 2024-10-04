import { useState, useCallback } from 'react';
import { axiosInstance } from '../helpers/helper';
import { PostFile } from '../components/atom/atoms';

export const useFileUpload = (setUploadedFiles: React.Dispatch<React.SetStateAction<PostFile[]>>) => {
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'complete'>('idle');
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileUpload = useCallback(async (files: FileList | null, postId: string) => {
    if (files && files.length > 0 && postId) {
      setUploadStatus('uploading');
      setUploadProgress(0);

      try {
        const formData = new FormData();
        const encodedFilename = encodeURIComponent(files[0].name);
        const encodedFile = new File([files[0]], encodedFilename, { type: files[0].type });
        formData.append('file', encodedFile);

        const response = await axiosInstance.post(`/posts/${postId}/files`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          },
          onUploadProgress: (progressEvent) => {
            if (progressEvent.total) {
              const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
              setUploadProgress(percentCompleted);
            }
          }
        });

        setUploadedFiles(prevFiles => [...prevFiles, response.data]);
        setUploadStatus('complete');

        setTimeout(() => {
          setUploadStatus('idle');
          setUploadProgress(0);
        }, 500);
      } catch (error) {
        console.error("파일 업로드 중 오류 발생:", error);
        setUploadStatus('idle');
      }
    }
  }, [setUploadedFiles]);

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>, postId: string) => {
    e.preventDefault();
    setIsDragging(false);
    handleFileUpload(e.dataTransfer.files, postId);
  }, [handleFileUpload]);

  return {
    uploadStatus,
    uploadProgress,
    isDragging,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    handleFileUpload
  };
};
