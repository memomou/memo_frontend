
import { Editor, Transforms, Element, Node, Point, Range } from "slate";
import { CustomElement } from "../../types/slate";
// Define our own custom set of helpers

const LIST_TYPES = ["numbered-list", "bulleted-list"];

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
    const isActive = this.isBoldMarkActive(editor)
    if (isActive) {
      Editor.removeMark(editor, 'bold')
    } else {
      Editor.addMark(editor, 'bold', true)
    }
  },

  toggleCodeBlock(editor: Editor) {
    const isActive = this.isCodeBlockActive(editor)
    Transforms.setNodes(
      editor,
      { type: isActive ? null : 'code' },
      { match: n => Element.isElement(n) && Editor.isBlock(editor, n) }
    )
  },
  /**
   * Checks whether a format block is active or not in the editor.
   * @param editor The current Slate editor
   * @param format The format block that is being checked
   */
  isBlockActive(editor, format) {
    const [match] = Editor.nodes(editor, {
      match: n => Element.isElement(n) && n.type === format
    });

    return !!match;
  },

  /**
   * Toggles a format block to be on / off.
   * @param editor The current Slate editor
   * @param format The format block that is being checked
   */
    toggleBlock(editor, format) {
    const isActive = this.isBlockActive(editor, format);
    const isList = LIST_TYPES.includes(format);

    Transforms.unwrapNodes(editor, {
      match: n => !!(Element.isElement(n) && n.type && LIST_TYPES.includes(n.type)),
      split: true
    });

    Transforms.setNodes(editor, {
      type: isActive ? "paragraph" : isList ? "list-item" : format
    });

    if (!isActive && isList) {
      const block = { type: format, children: [] };
      Transforms.wrapNodes(editor, block);
    }
  },

  /**
   * Checks whether a format mark is active or not in the editor.
   * @param editor The current Slate editor
   * @param format The format mark that is being checked
   */
    isMarkActive(editor, format) {
    const marks = Editor.marks(editor);
    return marks ? marks[format] === true : false;
  },

  /**
   * Toggles a format mark to be on / off.
   * @param editor The current Slate editor
   * @param format The format mark that is being checked
   */
    toggleMark(editor, format) {
    const isActive = this.isMarkActive(editor, format);

    if (isActive) {
      Editor.removeMark(editor, format);
    } else {
      Editor.addMark(editor, format, true);
    }
  },

  /**
   * Check whether the link button is active or not in the editor.
   * @param editor The current Slate editor
   */
    isLinkActive(editor){
    const [link] = Editor.nodes(editor, { match: n => Element.isElement(n) && n.type === "link" });
    return !!link;
  },

  /**
   * Unwraps a link node from the editor.
   * @param editor The current Slate editor
   */
    unwrapLink(editor) {
    Transforms.unwrapNodes(editor, { match: n => Element.isElement(n) && n.type === "link" });
  },

  /**
   * Wraps a link node to the editor.
   * @param editor The current Slate editor
   * @param url The url to wrap into a node
   */
    wrapLink(editor: Editor, url) {
    if (this.isLinkActive(editor)) {
      this.unwrapLink(editor);
    }

    const { selection } = editor;
    const isCollapsed = selection && Range.isCollapsed(selection);
    const link: CustomElement = {
      type: "link",
      url,
      children: isCollapsed ? [{ text: url }] : []
    };

    if (isCollapsed) {
      Transforms.insertNodes(editor, link);
    } else {
      Transforms.wrapNodes(editor, link, { split: true });
      Transforms.collapse(editor, { edge: "end" });
    }
  },

  /**
   * This will insert a link into the Slate editor.
   * @param editor The current Slate editor
   * @param url The url to insert
   */
    insertLink(editor, url) {
    if (editor.selection) {
      this.wrapLink(editor, url);
    }
  }
}


/**
 * Checks whether a format block is active or not in the editor.
 * @param editor The current Slate editor
 * @param format The format block that is being checked
 */
export const isBlockActive = (editor, format) => {
  const [match] = Editor.nodes(editor, {
    match: n => Element.isElement(n) && n.type === format
  });

  return !!match;
};

/**
 * Toggles a format block to be on / off.
 * @param editor The current Slate editor
 * @param format The format block that is being checked
 */
export const toggleBlock = (editor, format) => {
  const isActive = isBlockActive(editor, format);
  const isList = LIST_TYPES.includes(format);

  Transforms.unwrapNodes(editor, {
    match: n => !!(Element.isElement(n) && n.type && LIST_TYPES.includes(n.type)),
    split: true
  });

  Transforms.setNodes(editor, {
    type: isActive ? "paragraph" : isList ? "list-item" : format
  });

  if (!isActive && isList) {
    const block = { type: format, children: [] };
    Transforms.wrapNodes(editor, block);
  }
};

/**
 * Checks whether a format mark is active or not in the editor.
 * @param editor The current Slate editor
 * @param format The format mark that is being checked
 */
export const isMarkActive = (editor, format) => {
  const marks = Editor.marks(editor);
  return marks ? marks[format] === true : false;
};

/**
 * Toggles a format mark to be on / off.
 * @param editor The current Slate editor
 * @param format The format mark that is being checked
 */
export const toggleMark = (editor, format) => {
  const isActive = isMarkActive(editor, format);

  if (isActive) {
    Editor.removeMark(editor, format);
  } else {
    Editor.addMark(editor, format, true);
  }
};

/**
 * Check whether the link button is active or not in the editor.
 * @param editor The current Slate editor
 */
export const isLinkActive = editor => {
  const [link] = Editor.nodes(editor, { match: n => Element.isElement(n) && n.type === "link" });
  return !!link;
};

/**
 * Unwraps a link node from the editor.
 * @param editor The current Slate editor
 */
export const unwrapLink = editor => {
  Transforms.unwrapNodes(editor, { match: n => Element.isElement(n) && n.type === "link" });
};

/**
 * Wraps a link node to the editor.
 * @param editor The current Slate editor
 * @param url The url to wrap into a node
 */
export const wrapLink = (editor, url) => {
  if (isLinkActive(editor)) {
    unwrapLink(editor);
  }

  const { selection } = editor;
  const isCollapsed = selection && Range.isCollapsed(selection);
  const link: CustomElement = {
    type: "link",
    url,
    children: isCollapsed ? [{ text: url }] : []
  };

  if (isCollapsed) {
    Transforms.insertNodes(editor, link);
  } else {
    Transforms.wrapNodes(editor, link, { split: true });
    Transforms.collapse(editor, { edge: "end" });
  }
};

/**
 * This will insert a link into the Slate editor.
 * @param editor The current Slate editor
 * @param url The url to insert
 */
export const insertLink = (editor, url) => {
  if (editor.selection) {
    wrapLink(editor, url);
  }
};


export const resetNodes  = <T extends Node> (
  editor: Editor,
  options: {
    nodes?: Node | Node[],
    at?: Location
  } = {}
): void => {
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
