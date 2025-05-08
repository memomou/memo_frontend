import {PosterNewForm, PosterNewPageContainer} from "./posterPostPage.style";
import {StyledSlateEditor, StyledEditable} from "./posterPostPage.style";
import { useEffect, useState, useMemo } from "react";
import { withReact } from "slate-react";
import { withHistory } from "slate-history";
import { createEditor} from "slate";
import { useLocation, useSearchParams } from "react-router-dom";
import { axiosInstance } from '../../../helpers/helper';
import { defaultPostValue, selectedCategoriesAtom } from "../../../components/atom/atoms";
import { PostFile, PostStatus, PostType } from "../../../types/post";
import React, { useCallback, ChangeEvent, DragEvent } from 'react';
import { FileUploadArea } from './component/FileUploadArea';
import OptionsBar from "./component/OptionBar";
import { useCategories } from "./useCategories";
import UploadedFileArea from "./component/UploadedFileArea";
import { useTempPostLoader, useTempSave } from "./component/useTempPostLoader";
import { handlePostSubmission, updateEditorContent, useNavigationHistory, usePublishPost } from "./PosterPostPage.fn";
import { defaultValue, renderPlaceholder } from "./component/Editor";
import { ReactComponent as BackIcon } from "./assets/BackIcon.svg";
import { linkDecorator } from "../../../components/SlateEditor/LinkPlugin";
import ToolbarImplement from "../../../components/SlateEditor/Components/ToolbarImplement";
import { useRecoilState } from "recoil";
import { flattenTree } from "../../../components/SideBar/SortableTree/utilities";
import { convertCategoriesToTreeItems, findRecursively } from "../../../utils/categoryConverter";
import { Transforms } from 'slate';

function PosterPostPage() {
  const [placeholder, setPlaceHolder] = useState('내용을 입력하세요');
  const [editor] = useState(() => withReact(withHistory(createEditor())));
  const { performTempPostToast } = useTempPostLoader(editor);
  const { categories } = useCategories();
  const flattenedCategories = flattenTree(convertCategoriesToTreeItems(categories));
  const [uploadedFiles, setUploadedFiles] = useState<PostFile[]>([]);
  const [selectedCategory] = useRecoilState(selectedCategoriesAtom);
  const [post, setPost] = useState<PostType>({...defaultPostValue, category: selectedCategory});
  const [isUploading, setIsUploading] = useState(false);

  const location = useLocation();
  const queryParams = useMemo(() => new URLSearchParams(location.search), [location.search]);
  const postId = queryParams.get('postId');
  const postExist = postId ? true : false;
  const { goBack } = useNavigationHistory();

  // 임시 저장 관련 처리
  const { handleTempSave } = useTempSave({
    postStatus: post.statusId,
    post,
    editor,
    setPost,
  });

  const { publishPost } = usePublishPost();
  const [,setSearchParams] = useSearchParams();

  // 게시글 초기화
  useEffect(() => {
    const fetchPosts = async () => {
        const responsePost = await axiosInstance.get(`/posts/${postId}`);
        const fetchedPost = responsePost.data.post as PostType;
        setPost(fetchedPost);
        setUploadedFiles(fetchedPost.postFiles);
        // 에디터의 값 설정
        updateEditorContent(editor, fetchedPost.contentSlate);
        return fetchedPost;
    };
    if (postId) {
      const postPromise = fetchPosts();
      performTempPostToast(postPromise, setPost);
    }
  }, [editor, postId, performTempPostToast]);

  const onSubmitButtonClick = useCallback(async (event:React.FormEvent) => {
    event.preventDefault();
    publishPost(post, editor);
  }, [editor, post, publishPost]);

  const handleEditorDrop = useCallback(async (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    const files = Array.from(e.dataTransfer.files);
    const imageFiles = files.filter(file => file.type.startsWith('image/'));

    if (imageFiles.length === 0) return;
    let _postId = postId;
    if (!_postId) {
      const UpdatedPost = await handlePostSubmission(post, editor, PostStatus.UNREGISTERED);
      _postId = UpdatedPost.id;
      setSearchParams({ postId: _postId });
    }

    setIsUploading(true);
    try {
      // 첫 번째 이미지만 처리
      const formData = new FormData();
      const encodedFilename = encodeURIComponent(files[0].name);
      const encodedFile = new File([files[0]], encodedFilename, { type: files[0].type });
      formData.append('image', encodedFile);

      const response = await axiosInstance.post(`/posts/${_postId}/images`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      console.log('response: ', response);
      const imageNode = {
        type: 'image' as const,
        url: response.data.postImage.url,
        children: [{ text: '' }]
      };

      Transforms.insertNodes(editor, imageNode);
      const paragraph = {
        type: 'paragraph' as const,
        children: [{ text: '' }],
      }
      Transforms.insertNodes(editor, paragraph);
    } catch (error) {
      console.error('이미지 업로드 실패:', error);
    } finally {
      setIsUploading(false);
    }
  }, [editor, post]);

  // 별도의 컴포넌트로 분리
  return (
    <PosterNewPageContainer>
        <div className="editor-container mb-10">
          <OptionsBar
            items={flattenedCategories}
            initItemId={post.category?.id || selectedCategory?.id || 0}
            visibilityId={post.visibilityId}
            onItemChange={(e: ChangeEvent<HTMLSelectElement>) => {
              const selectedCategory = findRecursively(categories, category => category.id === Number(e.target.value));
              setPost( prev => ({...prev, category: selectedCategory}))}
            }
            onVisibilityChange=
            {
              (e: ChangeEvent<HTMLSelectElement>) =>
                setPost(prev => ({...prev, visibilityId: Number(e.target.value)}))
            }
          />
          <PosterNewForm onSubmit={onSubmitButtonClick}>
            <div className="editor-wrapper">
              <input
                className="title-input"
                type="text"
                name="title"
                placeholder="제목을 입력하세요"
                value={post.title}
                onChange={(e) => setPost(prev => ({...prev, title: e.target.value}))}
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
                        renderPlaceholder={renderPlaceholder}
                        onFocus={() => setPlaceHolder('')}
                        onBlur={() => setPlaceHolder('내용을 입력하세요')}
                        decorate={linkDecorator}
                        onDrop={handleEditorDrop}
                        onDragOver={(e) => e.preventDefault()}
                        style={{ opacity: isUploading ? 0.5 : 1 }}
                      />
                  }
                >
                  <ToolbarImplement />
                </StyledSlateEditor>
            </div>
            <UploadedFileArea
              uploadedFiles={uploadedFiles}
              setUploadedFiles={setUploadedFiles}
              postId={post.id}
            />

            <FileUploadArea
              post={post}
              editor={editor}
              setUploadedFiles={setUploadedFiles}
            />
            <div className="BottomContainer">
              <button onClick={goBack}>
                <BackIcon />
                <span>뒤로가기</span>
                </button>
              <div>
                <button onClick={handleTempSave}>임시 저장</button>
                <button type="submit">{postExist ? (post.statusId === PostStatus.DRAFT ?'등록하기' : '변경하기') : '등록하기'}</button>
              </div>
            </div>
          </PosterNewForm>
        </div>
    </PosterNewPageContainer>
  );
}

export default PosterPostPage;