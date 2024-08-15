import PosterNewForm from "./posterPostPage.style";
import {StyledSlateEditor, StyledEditable} from "./posterPostPage.style";
import { Styled } from "./authPage.style";
import { useMemo, useState } from "react";
import { RenderPlaceholderProps, withReact } from "slate-react";
import { withHistory } from "slate-history";
import { Descendant, createEditor, Element } from "slate";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from '../../helpers/helper';

const defaultValue : Element[] = [
  {
    type: 'paragraph',
    children: [{ text: 'A line of text in a paragraph.' }],
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
  const navigate = useNavigate();
  const initialValue_ = useMemo(
    () => {
      const content = localStorage.getItem('content');
      if (content) {
        return JSON.parse(content)
      } else {
        return defaultValue
      }
    },
    []
  )

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const [editor] = useState(() => withReact(withHistory(createEditor())));
  const onButtonClick = (event:React.FormEvent) => {
    event.preventDefault();
    console.log("editor.children", editor.children);
    const jsonContent = JSON.stringify(editor.children);
    console.log("jsonContent", jsonContent);
    console.log("title", title);
    // post 보내기
    // 성공하면 navigate('/')

    try {
      // const response = await axios.post(
      //   `${config.backendUri}/posts`,
      //   {
      //     email,
      //     password,
      //   }
      // );

      // console.log('게시글 저장 성공:', response);
      // navigate('/');
    } catch (error) {
      console.error("게시글 저장 실패:", error);
    }
  }
  return (
    <Styled>
      <PosterNewForm $width="500px">
        <div className="editor-wrapper">
          <input
            className="title-input"
            type="text"
            placeholder="제목을 입력하세요"
            value={title}
            onChange={handleTitleChange}
          />
          <div className='text-editor-wrapper'>
            <StyledSlateEditor
              editor={editor}
              initialValue={initialValue_}
              renderEditable={
                (editableProps) =>
                  <StyledEditable
                    {...editableProps}
                    placeholder={placeholder}
                    renderPlaceholder={renderPlaceholder} // 커스텀 플레이스홀더 추가
                    disableDefaultStyles={true}
                    onFocus={() => setPlaceHolder('')}
                    onBlur={() => setPlaceHolder('내용을 입력하세요')}
                  />
              }
            />
          </div>
        </div>
        <div className="BottomContainer">

          <button onClick={() => navigate('/')}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" stroke="currentColor" height="1em" width="1em">
  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
</svg>
            <span>나가기</span>
            </button>
          <button onClick={onButtonClick} type="submit">기록하기</button>
        </div>
      </PosterNewForm>
    </Styled>
  );
}

export default PosterPostPage;
