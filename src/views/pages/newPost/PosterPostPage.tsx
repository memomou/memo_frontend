import {PosterNewForm, PosterNewContainer} from "./posterPostPage.style";
import {StyledSlateEditor, StyledEditable} from "./posterPostPage.style";
import { Styled } from "../auth/authPage.style";
import { useEffect, useMemo, useState } from "react";
import { RenderPlaceholderProps, withReact } from "slate-react";
import { withHistory } from "slate-history";
import { Descendant, createEditor, Element, Transforms, Editor } from "slate";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from '../../../helpers/helper';
import { serialize } from "../../../components/SlateEditor/serialize";
import { useLocation } from 'react-router-dom';
import { PostType } from "../../../types/post";

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

function PosterPostPage(props: any) {
  const [title, setTitle] = useState('');
  const [placeholder, setPlaceHolder] = useState('내용을 입력하세요');
  const [post, setPost] = useState<PostType>();
  const navigate = useNavigate();
  const location = useLocation();

  // URLSearchParams 객체를 사용하여 쿼리 파라미터 추출
  const queryParams = new URLSearchParams(location.search);
  const postId = queryParams.get('postId');
  const isUpdate = postId ? true : false;
  const [editor] = useState(() => withReact(withHistory(createEditor())));

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axiosInstance.get(`/posts/${postId}`);
        const post = response.data.post;
        const deserializePost = { ...post, contentSlate: JSON.parse(post.contentSlate) } as PostType;
        setTitle(deserializePost.title);
        setPost(deserializePost);
        console.log('Post:', post);
        console.log('deserializePost:', deserializePost);
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

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();  // input에서 Enter 키 눌렀을 때 기본 동작 막음
    }
  };

  const onButtonClick = async (event:React.FormEvent) => {
    event.preventDefault();
    console.log("editor.children", editor.children);
    const jsonContent = JSON.stringify(editor.children);
    console.log("jsonContent", jsonContent);
    console.log("title", title);
    const deserialzedContent = serialize(editor);
    console.log("deserializedContent", deserialzedContent);
    try {
      const postData = {
        title: title,
        content: deserialzedContent,
        contentSlate: jsonContent,
      };

      try {
        const response = isUpdate
          ? await axiosInstance.patch(`/posts/${postId}`, postData)
          : await axiosInstance.post('/posts', postData);

        console.log(isUpdate ? '게시글 변경 성공:' : '게시글 저장 성공:', response);
        const {id: fetchedPostId} = response.data.post;
        console.log('post:', post);
        navigate(`/post/${fetchedPostId}`);
      } catch (error) {
        console.error('게시글 처리 중 오류 발생:', error);
      }
    } catch (error) {
      console.error("게시글 저장 실패:", error);
    }
  }
  return (
    <PosterNewContainer>
      <div className="options-bar">
        dd
      </div>
      <PosterNewForm onSubmit={onButtonClick}>
        <div className="editor-wrapper">
          <input
            className="title-input"
            type="text"
            placeholder="제목을 입력하세요"
            value={post ? post.title : title}
            onChange={handleTitleChange}
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
        <div className="BottomContainer">

          <button onClick={() => navigate('/')}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" stroke="currentColor" height="1em" width="1em">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
          </svg>
            <span>나가기</span>
            </button>
          <button type="submit">{isUpdate ? '변경하기' : '기록하기'}</button>
        </div>
      </PosterNewForm>
    </PosterNewContainer>
  );
}

export default PosterPostPage;
