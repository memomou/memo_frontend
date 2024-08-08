/* eslint-disable no-param-reassign */
import isUrl from "is-url";
import { Editor, Element } from "slate";

import { CustomEditor } from "./helper";

export function withLinks(editor: Editor): Editor {
  const { insertData, insertText, isInline } = editor;

  editor.isInline = (element: Element): boolean => {
    return element.type === "link" ? true : isInline(element);
  };

  editor.insertText = (text: string): void => {
    if (text && isUrl(text)) {
      CustomEditor.wrapLink(editor, text);
    } else {
      insertText(text);
    }
  };

  editor.insertData = (data: DataTransfer): void => {
    const text = data.getData("text/plain");

    if (text && isUrl(text)) {
      CustomEditor.wrapLink(editor, text);
    } else {
      insertData(data);
    }
  };

  return editor;
}
