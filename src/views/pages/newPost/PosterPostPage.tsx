import {PosterNewForm, PosterNewContainer, PosterNewPageContainer} from "./posterPostPage.style";
import {StyledSlateEditor, StyledEditable} from "./posterPostPage.style";
import { useEffect, useRef, useState, useMemo } from "react";
import { RenderPlaceholderProps, withReact } from "slate-react";
import { withHistory } from "slate-history";
import { createEditor, Element, Transforms, } from "slate";
import { useNavigate, useLocation } from "react-router-dom";
import { axiosInstance } from '../../../helpers/helper';
import { serialize } from "../../../components/SlateEditor/serialize";
import { defaultPostValue, PostStatus, PostType, Visibility } from "../../../components/atom/atoms";
import { PostFile } from "../../../components/atom/atoms";
import React, { useCallback, ChangeEvent } from 'react';
import { useFileUpload } from '../../../hooks/useFileUpload';
import { FileUploadArea } from './component/FileUploadArea';
import { formatFileSize, formatDate } from '../../../utils/formatters';
import OptionsBar from "./component/OptionBar";
import { useCategories } from "./useCategories";
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
  const categories = useCategories();
  const navigate = useNavigate();
  const location = useLocation();
  const titleInputRef = useRef<HTMLInputElement>(null);
  const [uploadedFiles, setUploadedFiles] = useState<PostFile[]>([]);
  const queryParams = useMemo(() => new URLSearchParams(location.search), [location.search]);
  const postId = queryParams.get('postId');
  const isUpdate = postId ? true : false;
  const [editor] = useState(() => withReact(withHistory(createEditor())));
  const [categoryId, setCategoryId] = useState<Number>(0);
  const [visibilityId, setVisibilityId] = useState<Visibility | undefined>(post.visibilityId);
  const historyRef = useRef<string[]>([]);

  useEffect(() => {
    historyRef.current.push(location.search);
    if (historyRef.current.length >= 3) {
      historyRef.current.shift(); // 배열의 첫 번째 요소 제거
    }
  }, [location]);

  useEffect(() => {
    const fetchPosts = async () => {
        const responsePost = await axiosInstance.get(`/posts/${postId}`);
        const post = responsePost.data.post as PostType;
        setPost(post);
        setCategoryId(post.category?.id ?? 0);
        setVisibilityId(post.visibilityId);
        setUploadedFiles(post.postFiles);
        // 에디터의 값 설정
        Transforms.deselect(editor);
        editor.children = post.contentSlate;
        editor.onChange();
        return post;
    };
    if (isUpdate) {
      const post = fetchPosts();
      performTempPostToast(post);
    }
  }, []);

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

  const getSendPostData = () => {
    const jsonContent = JSON.stringify(editor.children);
    const deserializedContent = serialize(editor);
    return {
      title: titleInputRef.current?.value,
      content: deserializedContent,
      contentSlate: jsonContent,
    }
  }

  const handlePostSubmission = async (postStatus: PostStatus) => {
    try {
      const postData = {
        ...getSendPostData(),
        categoryId: categoryId !== 0 ? categoryId : null,
        visibilityId: visibilityId,
        statusId: postStatus,
      };

      console.log(post);

      const response = isUpdate
        ? await axiosInstance.patch(`/posts/${postId}`, postData)
        : await axiosInstance.post('/posts', postData);

      const updatedPost = response.data.post as PostType;
      if (!updatedPost) {
        throw new Error('Post not found');
      }
      return updatedPost;
    } catch (error) {
      console.error('게시글 저장 실패:', error);
      throw error;
    }
  };

  const onButtonClick = async (event:React.FormEvent) => {
    event.preventDefault();
    const post = await handlePostSubmission(PostStatus.PUBLISHED);
    const {id: fetchedPostId} = post;
    navigate(`/${post.author.nickname}/post/${fetchedPostId}`);
  }

  const performTempPostToast = async (post: Promise<PostType>) => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    post.then((post) => {
      if (!post.tempPost) {
        return;
      }
      const userConfirmed = window.confirm("임시 저장된 게시글을 불러오시겠습니까?");
      if (!userConfirmed) {
        return;
      }
      const tempPost = post.tempPost;
      if (tempPost) {
        setPost((prev)=> ({...prev, title: tempPost.title}));
        Transforms.deselect(editor);
        editor.children = tempPost.contentSlate;
        editor.onChange();
      }
    });
  };

  const goBack = useCallback((event: React.MouseEvent) => {
    event.preventDefault();
    const currentHistory = historyRef.current;
    if (currentHistory.length >= 2 && currentHistory[0] !== currentHistory[1]) {
      navigate(-2);
    } else {
      navigate(-1);
    }
    // 현재 경로를 히스토리에서 제거
    historyRef.current = currentHistory.slice(0, -1);
  }, [navigate]);

  const onFileUpload = useCallback(async(files: FileList | null) => {
    if (!postId) {
      const post = await handlePostSubmission(PostStatus.UNREGISTERED);
      const {id: fetchedPostId} = post;
      navigate(`/post/write?postId=${fetchedPostId}`);
      handleFileUpload(files, fetchedPostId);
    }
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

  const handleTempSave = async (event: React.MouseEvent) => {
    event.preventDefault();
    // 아예 게시글이 없는 상태라면
    if (!isUpdate) {
      // 게시글을 임시 상태로 저장
      const post = await handlePostSubmission(PostStatus.DRAFT);
      const {id: fetchedPostId} = post;
      setPost((prev) => ({...prev, statusId: PostStatus.DRAFT}));
      navigate(`/post/write?postId=${fetchedPostId}`);
    }
    // 게시글이 있는 상태이고
    else {
      // 게시글 상태가 published 가 아니었다면
      if (post.statusId !== PostStatus.PUBLISHED) {
        // 게시글 상태를 임시 상태로 저장
        await handlePostSubmission(PostStatus.DRAFT);
        setPost((prev) => ({...prev, statusId: PostStatus.DRAFT}));
      }
      // 게시글 상태가 published 일 때
      else {
        // 게시글의 임시 게시글 테이블에 저장
        await axiosInstance.put(`/posts/${postId}/temp`, getSendPostData());
      }
    }
    alert('임시 저장되었습니다.');
  };

  // 별도의 컴포넌트로 분리
  return (
    <PosterNewPageContainer>
      <PosterNewContainer>
        <OptionsBar
          categories={categories}
          selectedCategoryId={categoryId}
          visibilityId={visibilityId}
          onCategoryChange={(e: ChangeEvent<HTMLSelectElement>) => setCategoryId(Number(e.target.value))}
          onVisibilityChange={(e: ChangeEvent<HTMLSelectElement>) => setVisibilityId(Number(e.target.value))}
        />
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
                onKeyDown={(event) => {
                  if (event.key === 'Enter') {
                    event.preventDefault();
                  }
                }}
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
            {uploadedFiles && uploadedFiles.length > 0 && (
            <div className="attachment-section">
              <h4>업로드된 파일</h4>
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
            </div>
            )}

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
              <div>
                <button onClick={handleTempSave}>임시 저장</button>
                <button type="submit">{isUpdate ? (post.statusId === PostStatus.DRAFT ?'등록하기' : '변경하기') : '등록하기'}</button>
              </div>
            </div>
          </PosterNewForm>
        </div>
      </PosterNewContainer>
    </PosterNewPageContainer>
  );
}

export default PosterPostPage;