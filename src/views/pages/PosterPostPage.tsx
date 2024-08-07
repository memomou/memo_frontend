import PosterNewForm from "./posterPostPage.style";
import {StyledSlateEditor, StyledEditable} from "./posterPostPage.style";
import { Styled } from "./authPage.style";
import { useMemo, useState } from "react";
import { withReact } from "slate-react";
import { withHistory } from "slate-history";
import { Descendant, createEditor, Element } from "slate";

const defaultValue : Element[] = [
  {
    type: 'paragraph',
    children: [{ text: 'A line of text in a paragraph.' }],
  }
]

function PosterPostPage(props: any) {
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
  const [value, setValue] = useState<Descendant[]>(initialValue_);
  const onButtonClick = (event:React.FormEvent) => {
    event.preventDefault();
    console.log(editor.children);
  }
  return (
    <Styled>
      <PosterNewForm $width="500px">
        <input type="text" placeholder="제목"  />
        <div className="editor-wrapper">
          <StyledSlateEditor
            editor={editor}
            initialValue={value}
            renderEditable={(editableProps) => <StyledEditable {...editableProps} />}
          />
        </div>
        <button onClick={onButtonClick} type="submit">Submit</button>
      </PosterNewForm>
    </Styled>
  );
}

export default PosterPostPage;
