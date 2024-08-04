import styled from "styled-components";
import { useState, useMemo, useCallback } from "react";
import axios from "axios";
import config from "../../config";
import PosterNewForm from "./posterPostPage.style";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { userAtom } from "../../components/atom/atoms";
import { useNavigate } from "react-router-dom";
import { Styled } from "./authPage.style";
import { createEditor, Descendant, Editor, Transforms, Element } from 'slate'
import { Slate, Editable, withReact } from 'slate-react'
import { CustomText } from "../../types/slate";


function PosterPostPage(props: any) {
  const [title, setTitle] = useState();
  const [content, setContent] = useState();
  const navigate = useNavigate();
  const user = useRecoilValue(userAtom);
  // Create a Slate editor object that won't change across renders.
  const [editor] = useState(() => withReact(createEditor()))
  const [value, setValue] = useState<Descendant[]>(initialValue);

  const renderElement = useCallback((props: any) => {
    switch (props.element.type) {
      case 'code':
        return <CodeElement {...props} />
      default:
        return <DefaultElement {...props} />
    }
  }, [])

  // Define a leaf rendering function that is memoized with `useCallback`.
  const renderLeaf = useCallback((props: any) => {
    return <Leaf {...props} />
  }, [])

  return (
    <Styled>
      <PosterNewForm $width="400px">
        <input type="text" placeholder="제목"  />
        <Slate editor={editor} initialValue={initialValue}>
      <Editable
        renderElement={renderElement}
        renderLeaf={renderLeaf}
        onKeyDown={event => {
          console.log(event.key)
          if (!event.ctrlKey) {
            return
          }
          switch (event.key) {
            // When "`" is pressed, keep our existing code block logic.
            case '`': {
              event.preventDefault()
              const [match] = Editor.nodes(editor, {
                match: n => Element.isElement(n) && n.type === 'code',
              })
              Transforms.setNodes(
                editor,
                { type: match ? 'paragraph' : 'code' },
                { match: n => Element.isElement(n) && Editor.isBlock(editor, n) }
              )
              break
            }

            // When "B" is pressed, bold the text in the selection.
            case 'b': {
              event.preventDefault()
              Editor.addMark(editor, 'bold', true)
              break
            }
          }
        }}
      />
    </Slate>
        <button type="submit">Submit</button>
      </PosterNewForm>
    </Styled>
  );
}

const initialValue: Descendant[] = [
  {
    type: 'paragraph',
    children: [{ text: 'A line of text in a paragraph.' }],
  },
]

// Define a React component renderer for our code blocks.
const CodeElement = (props: any) => {
  return (
    <pre {...props.attributes}>
      <code>{props.children}</code>
    </pre>
  )
}

const DefaultElement = (props: any) => {
  return <p {...props.attributes}>{props.children}</p>
}

// Define a React component to render leaves with bold text.
const Leaf = (props: any) => {
  return (
    <span
      {...props.attributes}
      style={{ fontWeight: props.leaf.bold ? 'bold' : 'normal' }}
    >
      {props.children}
    </span>
  )
}


export default PosterPostPage;
