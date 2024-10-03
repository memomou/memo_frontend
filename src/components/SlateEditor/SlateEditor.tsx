// https://codesandbox.io/s/slateeditor-with-types-6zpfi?file=/src/components/SlateEditor/toolbarElements.tsx

import { forwardRef, useCallback, useMemo, useState } from "react";
import { Descendant, Editor, createEditor, Transforms, Element as SlateElement } from "slate";
import { Editable, ReactEditor, Slate, useFocused, useSelected, useSlateStatic, withReact } from "slate-react";
import { resetNodes } from "./helper";
import { Leaf, Element } from "./deserialize";
import {toggleKeyboardShortcut} from "./keyboardShortcut";
import ToolbarImplement from "./Components/ToolbarImplement";
// TODO Link Plugin 설치해보기
// https://codesandbox.io/p/sandbox/slateeditor-with-types-forked-4yl2tz?file=%2Fsrc%2Fcomponents%2FSlateEditor%2Fplugins.tsx%3A21%2C1

const StyledInput = styled.input`
  display: none;
`;

const StyledImageLabel = styled.label<{active: boolean}>`
  cursor: pointer;
  color: ${props => props.active ? "black" : "#ccc"};
  display: flex;
  align-items: center;
`;

const ImgContainer = styled.div`
  position: relative;
`;

const Img = styled.img<{selected: boolean, focused: boolean}>`
  display: block;
  max-width: 100%;
  max-height: 20em;
  box-shadow: ${(props) =>
    props.selected && props.focused ? "0 0 0 3px #B4D5FF" : "none"};
`;

const DeleteButton = styled(Button)<{selected: boolean, focused: boolean}>`
  display: ${(props) => (props.selected && props.focused ? "block" : "none")};
  position: absolute;
  top: 0.5em;
  left: 0.5em;
  background-color: white;
  z-index: 1;
  padding: 2px 5px;
  border: 1px solid #ccc;
  border-radius: 3px;
  cursor: pointer;
`;

export const Image = forwardRef(({ attributes, children, element}: any, ref) => {
  const editor = useSlateStatic();
  const path = ReactEditor.findPath(editor, element);

  const removeImage = () => {
    Transforms.removeNodes(editor, { at: path });
  };

  const selected = useSelected();
  const focused = useFocused();

  return (
    <div {...attributes} ref={ref}>
      {children}
      <ImgContainer contentEditable={false}>
        <Img
          src={element.url}
          alt="image"
          selected={selected}
          focused={focused}
        />
        <DeleteButton
          active
          selected={selected}
          focused={focused}
          onMouseDown={removeImage}
        >
          삭제
        </DeleteButton>
      </ImgContainer>
    </div>
  );
});

function SlateEditor({
      editor,
      initialValue,
      renderEditable = (props) => <Editable {...props} />,
    } : {
      editor: Editor,
      initialValue: Descendant[],
      renderEditable?: (props: any) => JSX.Element,
    })
{
  const [active, setActive] = useState(false);

  const handleActive = () => {
    setActive(!active);
  }

  const renderElement = useCallback((props: any) => {
    return <Element {...props} />
  }, [])

  const renderLeaf = useCallback((props: any) => {
    return <Leaf {...props} />
  }, [])

  const insertImage = (editor, url) => {
    const text = { text: "" };
    const image = { type: "image", url, children: [text] };
    Transforms.insertNodes(editor, image as any);
    Transforms.insertNodes(editor, {
      type: "paragraph",
      children: [{ text: "" }],
    });
  };

  return (
    <Slate
      editor={editor}
      initialValue={initialValue}
      onChange={value => {
        const isAstChange = editor.operations.some(
          op => 'set_selection' !== op.type
        )
        if (isAstChange) {
          // 현재 상태 저장
          // const content = JSON.stringify(value)
          // localStorage.setItem('content', content)
        }
      }}
    >
      <ToolbarImplement />
      {renderEditable({
        className: "slate-editable",
        renderElement,
        renderLeaf,
        onKeyDown: (event: any) => {
          toggleKeyboardShortcut(event, editor);
        },
      })}
  </Slate>);
}


export default SlateEditor;