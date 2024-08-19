import escapeHtml from 'escape-html'
import { Text, Element, Editor } from 'slate'

function isLeaf(element: any): element is Text {
  return (element as Text).text !== undefined;
}

function serializeLeaf (node: Text) {
  let string = escapeHtml(node.text)
  if (node.bold) {
    string = `<strong>${string}</strong>`
  }

  if (node.code) {
    string = `<code>${string}</code>`
  }

  if (node.italic) {
    string = `<em>${string}</em>`
  }

  if (node.underline) {
    string = `<u>${string}</u>`
  }
  return `<span>${string}</span>`
}

function isCustomElement(node: any): node is Element {
  return 'type' in node;
}

function serializeElement(node: Element | Editor) {
  const children = node.children.map(n => serialize(n)).join('');
  if (!isCustomElement(node) || !node.type) {
    return children;
  }

  switch (node.type) {
    case 'paragraph':
      return `<p>${children}</p>`
    case 'block-quote':
      return `<blockquote>${children}</blockquote>`
    case 'bulleted-list':
      return `<ul>${children}</ul>`
    case 'heading':
      return `<h1>${children}</h1>`
    case 'heading-two':
      return `<h2>${children}</h2>`
    case 'link':
      return `<a href="${escapeHtml(node.url)}">${children}</a>`
    case 'list-item':
      return `<li>${children}</li>`
    case 'numbered-list':
      return `<ol>${children}</ol>`
    default:
      return children
  }
}

export const serialize = (node: Element | Text | Editor) => {
  if (isLeaf(node)) {
    const leaf = node as Text;
    return serializeLeaf(leaf);
  }

  return serializeElement(node);
}
