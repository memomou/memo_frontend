import { useCallback, useState } from "react";
import { Descendant, Editor, createEditor, Transforms, Element } from "slate";
import { Editable, Slate, withReact } from "slate-react";

function SlateEditor({
  initialValue,
  renderEditable = (props) => <Editable {...props} />, // 기본적으로 Editable 사용
}: {
  initialValue?: Descendant[],
  renderEditable?: (props: any) => JSX.Element, // 커스텀 Editable 컴포넌트를 위한 프로퍼티
})
  {
  const [editor] = useState(() => withReact(createEditor()))
  const [value, setValue] = useState<Descendant[]>(initialValue ?? initialValue_);
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

  return ( <Slate editor={editor} initialValue={value}>
      {renderEditable({
        className: "slate-editable",
        renderElement,
        renderLeaf,
        onKeyDown: (event: any) => {
          if (!event.ctrlKey) {
            return;
          }
          switch (event.key) {
            case '`': {
              event.preventDefault();
              const [match] = Editor.nodes(editor, {
                match: n => Element.isElement(n) && n.type === 'code',
              })
              Transforms.setNodes(
                editor,
                { type: match ? 'paragraph' : 'code' },
                { match: n => Element.isElement(n) && Editor.isBlock(editor, n) }
              )
              break;
            }

            case 'b': {
              event.preventDefault();
              Editor.addMark(editor, 'bold', true);
              break;
            }
          }
        },
      })}
  </Slate>);
}

const initialValue_: Descendant[] = [
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

export default SlateEditor;