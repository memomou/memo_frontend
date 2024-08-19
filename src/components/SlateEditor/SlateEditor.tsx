// https://codesandbox.io/s/slateeditor-with-types-6zpfi?file=/src/components/SlateEditor/toolbarElements.tsx

import { useCallback, useMemo, useState } from "react";
import { Descendant, Editor, createEditor, Transforms, Element as SlateElement } from "slate";
import { Editable, Slate, withReact } from "slate-react";
import { resetNodes } from "./helper";
import { Leaf, Element } from "./deserialize";
import { Toolbar, MarkButton, BlockButton} from "./components";
import {toggleKeyboardShortcut} from "./keyboardShortcut";

// TODO Link Plugin 설치해보기
// https://codesandbox.io/p/sandbox/slateeditor-with-types-forked-4yl2tz?file=%2Fsrc%2Fcomponents%2FSlateEditor%2Fplugins.tsx%3A21%2C1

const defaultValue : SlateElement[] = [
  {
    type: 'paragraph',
    children: [{ text: 'A line of text in a paragraph.' }],
  }
]

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
  const renderElement = useCallback((props: any) => {
    return <Element {...props} />
  }, [])

  const renderLeaf = useCallback((props: any) => {
    return <Leaf {...props} />
  }, [])

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