import PosterNewForm from "./posterPostPage.style";
import {StyledSlateEditor, StyledEditable} from "./posterPostPage.style";
import { Styled } from "./authPage.style";
import { useMemo, useState } from "react";
import { withReact } from "slate-react";
import { withHistory } from "slate-history";
import { Descendant, createEditor, Element } from "slate";
import axios from "axios";
import config from "../../config";
import { useNavigate } from "react-router-dom";

const defaultValue : Element[] = [
  {
    type: 'paragraph',
    children: [{ text: 'A line of text in a paragraph.' }],
  }
]

function PosterPostPage(props: any) {
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
  const [editor] = useState(() => withReact(withHistory(createEditor())));
  const onButtonClick = (event:React.FormEvent) => {
    event.preventDefault();
    console.log("editor.children", editor.children);
    const jsonContent = JSON.stringify(editor.children);
    console.log("jsonContent", jsonContent);
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
        <input type="text" placeholder="제목"  />
        <div className="editor-wrapper">
          <StyledSlateEditor
            editor={editor}
            initialValue={initialValue_}
            renderEditable={(editableProps) => <StyledEditable {...editableProps} />}
          />
        </div>
        <button onClick={onButtonClick} type="submit">Submit</button>
      </PosterNewForm>
    </Styled>
  );
}

export default PosterPostPage;
