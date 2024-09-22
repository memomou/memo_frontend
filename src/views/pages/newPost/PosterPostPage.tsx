import {PosterNewForm, PosterNewContainer, PosterNewPageContainer} from "./posterPostPage.style";
import {StyledSlateEditor, StyledEditable} from "./posterPostPage.style";
import { useEffect, useRef, useState, useMemo } from "react";
import { RenderPlaceholderProps, withReact } from "slate-react";
import { withHistory } from "slate-history";
import { createEditor, Element, Transforms, } from "slate";
import { useNavigate, useLocation } from "react-router-dom";
import { axiosInstance } from '../../../helpers/helper';
import { serialize } from "../../../components/SlateEditor/serialize";
import { CategoriesState, defaultPostValue, PostType } from "../../../components/atom/atoms";
import { PostFile } from "../../../components/atom/atoms";
import React, { useCallback } from 'react';
import { useFileUpload } from '../../../hooks/useFileUpload';
import { FileUploadArea } from './component/FileUploadArea';
import { formatFileSize, formatDate } from '../../../utils/formatters';
const defaultValue : Element[] = [
  {
    type: 'paragraph',
    children: [{ text: '' }],
  }
]

function renderPlaceholder(props: RenderPlaceholderProps) {
  const { children, attributes } = props;

  return (
    <span {...attributes} style={{ opacity: 0.5, fontStyle: 'italic', width: "0px", pointerEvents: "none" }} className="placeholder">
      {children || '내용을 입력하세요...'}
    </span>
  );
}

function PosterPostPage() {
  const [placeholder, setPlaceHolder] = useState('내용을 입력하세요');
  const [post, setPost] = useState<PostType>(defaultPostValue);
  const [categories, setCategories] = useState<CategoriesState[]>();
  const selectedCategoryId = post.category?.id;
  const navigate = useNavigate();
  const location = useLocation();
  const titleInputRef = useRef<HTMLInputElement>(null);
  const [uploadedFiles, setUploadedFiles] = useState<PostFile[]>([]);

  const queryParams = useMemo(() => new URLSearchParams(location.search), [location.search]);
  const postId = queryParams.get('postId');
  const isUpdate = postId ? true : false;
  const [editor] = useState(() => withReact(withHistory(createEditor())));

  const selectedCategoryIdRef = useRef<HTMLSelectElement>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const responsePost = await axiosInstance.get(`/posts/${postId}`);
        const post = responsePost.data.post;
        const deserializePost = { ...post, contentSlate: post?.contentSlate ? JSON.parse(post.contentSlate) : defaultValue } as PostType;
        setPost(deserializePost);
        setUploadedFiles(post.postFiles);
        // 에디터의 값 설정
        Transforms.deselect(editor); // 현재 선택 상태를 비우기
        editor.children = deserializePost.contentSlate; // 에디터의 내용 전체 교체
        editor.onChange(); // 에디터의 변경 사항 적용
      } catch (error) {
        console.error("Failed to fetch posts:", error);
      }
    };
    if (isUpdate) {
      fetchPosts();
    }
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const responseCategories = await axiosInstance.get(`/categories/me`);
        console.log('Categories:', responseCategories);
        setCategories(responseCategories.data);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    }
    fetchCategories();
  }, []);

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();  // input에서 Enter 키 눌렀을 때 기본 동작 막음
    }
  };

  const onButtonClick = async (event:React.FormEvent) => {
    event.preventDefault();
    const jsonContent = JSON.stringify(editor.children);
    const deserialzedContent = serialize(editor);
    try {
      const categoryId = selectedCategoryIdRef?.current?.value;
      const postData = {
        title: titleInputRef.current?.value,
        content: deserialzedContent,
        contentSlate: jsonContent,
        categoryId: categoryId !== "0" ? categoryId : null,
      };
      console.log("postData: ", postData);
      try {
        const response = isUpdate
          ? await axiosInstance.patch(`/posts/${postId}`, postData)
          : await axiosInstance.post('/posts', postData);

        console.log(isUpdate ? '게시글 변경 성공:' : '게시글 저장 성공:', response);
        const post = response.data.post as PostType;
        const {id: fetchedPostId} = post;
        console.log('post:', post);
        navigate(`/${post.author.nickname}/post/${fetchedPostId}`);
      } catch (error) {
        console.error('게시글 처리 중 오류 발생:', error);
      }
    } catch (error) {
      console.error("게시글 저장 실패:", error);
    }
  }

  const goBack = (event: React.MouseEvent) => {
    event.preventDefault();
    navigate(-1);
  };

  const handleFileUploaded = useCallback((file: any) => {
    setUploadedFiles(prevFiles => [...prevFiles, file]);
  }, []);

  const {
    uploadStatus,
    uploadProgress,
    isDragging,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    handleFileUpload
  } = useFileUpload(handleFileUploaded);

  const onFileUpload = useCallback((files: FileList | null) => {
    if (postId) {
      handleFileUpload(files, postId);
    }
  }, [postId, handleFileUpload]);

  const handleFileDelete = async (event: React.MouseEvent, fileId: number) => {
    try {
      event.preventDefault();
      // 삭제 확인 대화상자 추가
      if (window.confirm('정말로 이 파일을 삭제하시겠습니까?')) {
        await axiosInstance.delete(`/posts/${postId}/files/${fileId}`);
        setUploadedFiles(prevFiles => prevFiles.filter(file => file.id !== fileId));
      }
    } catch (error) {
      console.error("파일 삭제 실패:", error);
    }
  };

  return (
    <PosterNewPageContainer>
      <PosterNewContainer>
        <div className="options-bar">
          <div>
            <select id="category" name="category" ref={selectedCategoryIdRef} defaultValue={selectedCategoryId}>
              <option value={0}>전체 게시글</option>
              {categories?.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.categoryName} {/* 카테고리 이름을 보여줌 */}
                </option>
              ))}
            </select>
          </div>
          <div>
          </div>
        </div>
        <div className="editor-container">
          <PosterNewForm onSubmit={onButtonClick}>
            <div className="editor-wrapper">
              <input
                className="title-input"
                type="text"
                name="title"
                ref={titleInputRef}
                placeholder="제목을 입력하세요"
                defaultValue={post.title}
                onKeyDown={handleKeyDown}
              />
                <StyledSlateEditor
                  editor={editor}
                  initialValue={defaultValue}
                  renderEditable={
                    (editableProps) =>
                      <StyledEditable
                        {...editableProps}
                        placeholder={placeholder}
                        renderPlaceholder={renderPlaceholder} // 커스텀 플레이스홀더 추가
                        // disableDefaultStyles={true}
                        onFocus={() => setPlaceHolder('')}
                        onBlur={() => setPlaceHolder('내용을 입력하세요')}
                      />
                  }
                />
            </div>
            {/* 업로드된 파일 목록 (위치 변경) */}
            <div className="uploaded-files">
              {uploadedFiles?.map((file) => (
                <div key={file.id} className="file-item">
                  <a href={file.url} download={file.originalFilename} className="file-name">{file.originalFilename}</a>
                  <span className="file-info">
                    {formatFileSize(file.fileSize)} | {formatDate(file.createdAt)}
                  </span>
                  <button onClick={(e) => handleFileDelete(e, file.id)} className="delete-button">
                    &#10005; {/* X 표시 */}
                  </button>
                </div>
              ))}
            </div>

            <FileUploadArea
              onFileUpload={onFileUpload}
              uploadStatus={uploadStatus}
              uploadProgress={uploadProgress}
              isDragging={isDragging}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={(e) => handleDrop(e, postId!)}
            />
            <div className="BottomContainer">
              <button onClick={goBack}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" stroke="currentColor" height="1em" width="1em">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
              </svg>
                <span>뒤로가기</span>
                </button>
              <button type="submit">{isUpdate ? '변경하기' : '기록하기'}</button>
            </div>
          </PosterNewForm>
        </div>
      </PosterNewContainer>
    </PosterNewPageContainer>
  );
}

export default PosterPostPage;
