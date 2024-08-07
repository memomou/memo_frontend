
import { Editor, Transforms, Element, Node, Point } from "slate";
// Define our own custom set of helpers
export const CustomEditor = {
  isBoldMarkActive(editor: Editor) {
    const marks = Editor.marks(editor)
    return marks ? marks.bold === true : false
  },

  isCodeBlockActive(editor: Editor) {
    const [match] = Editor.nodes(editor, {
      match: n => Element.isElement(n) && n.type === 'code',
    })

    return !!match
  },

  toggleBoldMark(editor: Editor) {
    const isActive = CustomEditor.isBoldMarkActive(editor)
    if (isActive) {
      Editor.removeMark(editor, 'bold')
    } else {
      Editor.addMark(editor, 'bold', true)
    }
  },

  toggleCodeBlock(editor: Editor) {
    const isActive = CustomEditor.isCodeBlockActive(editor)
    Transforms.setNodes(
      editor,
      { type: isActive ? null : 'code' },
      { match: n => Element.isElement(n) && Editor.isBlock(editor, n) }
    )
  },

  resetNodes<T extends Node>(
    editor: Editor,
    options: {
      nodes?: Node | Node[],
      at?: Location
    } = {}
  ): void {
    const children = [...editor.children]

    children.forEach((node) => editor.apply({ type: 'remove_node', path: [0], node }))

    if (options.nodes) {
      const nodes = Node.isNode(options.nodes) ? [options.nodes] : options.nodes

      nodes.forEach((node, i) => editor.apply({ type: 'insert_node', path: [i], node: node }))
    }

    const point = options.at && Point.isPoint(options.at)
      ? options.at
      : Editor.end(editor, [])

    if (point) {
      Transforms.select(editor, point)
    }
  }
}
