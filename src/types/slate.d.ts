// This example is for an Editor with `ReactEditor` and `HistoryEditor`
import { BaseEditor } from 'slate'
import { ReactEditor } from 'slate-react'
import { HistoryEditor } from 'slate-history'

// 커스텀 엘리먼트와 텍스트 타입 정의
type CustomElement = {
    type?:
      'paragraph'     |
      'heading'       |
      'code'          |
      'link'          |
      'quote'         |
      'block-quote'   |
      'bulleted-list' |
      'heading-one'   |
      'heading-two'   |
      'list-item'     |
      'numbered-list' |
      null;
    children: CustomText[], url?: any
};

type CustomText = {
    text: string;
    bold?: boolean;
    italic?: boolean;
    underline?: boolean;
    code?: boolean;
    url?: string;
  };


declare module 'slate' {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor & HistoryEditor
    Element: CustomElement
    Text: CustomText
  }
}
