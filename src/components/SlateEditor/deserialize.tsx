import { Element as slateElement } from 'slate'
import { Image } from './SlateEditor';

export function Element({ attributes, children, element } : { attributes: any, children: any, element: slateElement }) {
  switch (element.type) {
    case "block-quote":
      return <blockquote {...attributes}>{children}</blockquote>;

    case "bulleted-list":
      return <ul {...attributes}>{children}</ul>;

    case "heading":
      return <h1 {...attributes}>{children}</h1>;

    case "heading-two":
      return <h2 {...attributes}>{children}</h2>;

    case "link":
      return (
        <a {...attributes} href={element.url}>
          {children}
        </a>
      );

    case "list-item":
      return <li {...attributes}>{children}</li>;
    
    case "image":
      return <Image {...attributes} element={element} />;

    default:
      return <p {...attributes}>{children}</p>;
  }
}

export function Leaf({ attributes, children, leaf }) {
  if (leaf.bold) {
    children = <strong>{children}</strong>;
  }

  if (leaf.code) {
    children = <code>{children}</code>;
  }

  if (leaf.italic) {
    children = <em>{children}</em>;
  }

  if (leaf.underline) {
    children = <u>{children}</u>;
  }

  return <span {...attributes}>{children}</span>;
}
