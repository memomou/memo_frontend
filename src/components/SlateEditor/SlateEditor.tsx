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
          const content = JSON.stringify(value)
          localStorage.setItem('content', content)
        }
      }}
    >
      <Toolbar>
            <MarkButton format="bold" icon="format_bold" />
            <MarkButton format="italic" icon="format_italic" />
            <MarkButton format="underline" icon="format_underlined" />
            <MarkButton format="code" icon="code" />
            <BlockButton format="heading-one" icon="looks_one" />
            <BlockButton format="heading-two" icon="looks_two" />
            <BlockButton format="block-quote" icon="format_quote" />
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