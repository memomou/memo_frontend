import escapeHtml from 'escape-html'
import { Text, Element } from 'slate'
import { CustomText } from '../../types/slate';

function isCustomText(element: any): element is CustomText {
  return (element as CustomText).text !== undefined;
}

export const serialize = (node: Element | CustomText) => {
  if (isCustomText(node)) {
    let string = escapeHtml(node.text)
    if (node.bold) {
      string = `<strong>${string}</strong>`
    }
    return string
  }

  const children = node.children.map(n => serialize(n)).join('')

  switch (node.type) {
    case 'quote':
      return `<blockquote><p>${children}</p></blockquote>`
    case 'paragraph':
      return `<p>${children}</p>`
    case 'link':
      return `<a href="${escapeHtml(node.url)}">${children}</a>`
    default:
      return children
  }
}
