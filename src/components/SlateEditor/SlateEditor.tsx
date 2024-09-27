// https://codesandbox.io/s/slateeditor-with-types-6zpfi?file=/src/components/SlateEditor/toolbarElements.tsx

import { forwardRef, useCallback, useMemo, useState } from "react";
import { Descendant, Editor, createEditor, Transforms, Element as SlateElement } from "slate";
import { Editable, ReactEditor, Slate, useFocused, useSelected, useSlateStatic, withReact } from "slate-react";
import { resetNodes } from "./helper";
import { Leaf, Element } from "./deserialize";
import { Toolbar, MarkButton, BlockButton, Button} from "./components";
import {toggleKeyboardShortcut} from "./keyboardShortcut";
import styled from "styled-components";

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
      <Toolbar className="toolbar">
            <MarkButton format="bold" icon="format_bold">
              <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" stroke="currentColor" height="1em" width="1em" strokeWidth="0">
                <path d="M15.6 10.79c.97-.67 1.65-1.77 1.65-2.79 0-2.26-1.75-4-4-4H7v14h7.04c2.09 0 3.71-1.7 3.71-3.79 0-1.52-.86-2.82-2.15-3.42zM10 6.5h3c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5h-3v-3zm3.5 9H10v-3h3.5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5z" />
              </svg>
            </MarkButton>
            <MarkButton format="italic" icon="format_italic">
              <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" stroke="currentColor" height="1em" width="1em" strokeWidth="0">
                <path d="M10 4v3h2.21l-3.42 8H6v3h8v-3h-2.21l3.42-8H18V4z" />
              </svg>
            </MarkButton>
            <BlockButton format="heading-one" icon="looks_one" style={{innerHeight: "2.4rem"}}>
            <div style={{fontFamily: "serif", fontWeight:"bold", fontSize:"1.3rem"}}>
            <span>H</span>
              <span style={{fontFamily: "serif", fontSize:"1.1rem"}}>1</span>
            </div>
            </BlockButton>
            <BlockButton format="heading-two" icon="looks_two">
            <div style={{fontFamily: "serif", fontWeight:"bold", fontSize:"1.3rem"}}>
            <span>H</span>
              <span style={{fontFamily: "serif", fontSize:"1.1rem"}}>2</span>
            </div>
            </BlockButton>
            <BlockButton format="numbered-list" icon="format_list_numbered" />
            <BlockButton format="bulleted-list" icon="format_list_bulleted" />
            <StyledImageLabel onClick={handleActive} active={active}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            stroke="currentColor"
            height="1em"
            width="1em"
          >
            <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"></path>
          </svg>
          <StyledInput type="file" accept="image/*" onChange={(event) => {
            const file = event.target.files?.[0];
            if (file) {
              const reader = new FileReader();
              reader.addEventListener("load", () => {
                const imageUrl = reader.result;
                insertImage(editor, imageUrl);
              });
          reader.readAsDataURL(file);
            }
          }}
        />
        </StyledImageLabel>
      </Toolbar>
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