/**
 * Base components for the SlateEditor component.
 */
import React from "react";
import ReactDOM from "react-dom";
import { useSlate } from "slate-react";
import { css, cx } from '@emotion/css'
import {
  isBlockActive,
  toggleBlock,
  isMarkActive,
  toggleMark,
  isLinkActive,
  insertLink
} from "./helper";

export const Button = React.forwardRef(
  ({ className, active, reversed, ...props } : any, ref) => (
    <span
      {...props}
      ref={ref}
      className={cx(
        className,
        css`
          cursor: pointer;
          color: ${reversed
            ? active
              ? "white"
              : "#aaa"
            : active
            ? "black"
            : "#ccc"};
          display: flex;
          align-items: center;
        `
      )}
    />
  )
);

export const Icon = React.forwardRef(({ className, ...props }: any, ref) => (
  <span
    {...props}
    ref={ref}
    className={cx(
      "material-icons",
      className,
      css`
        font-size: 18px;
        vertical-align: text-bottom;
      `
    )}
  />
));

export const Menu = React.forwardRef(({ className, ...props }: any, ref) => (
  <div
    {...props}
    ref={ref}
    className={cx(
      className,
      css`
        & > * {
          display: inline-block;
        }

        & > * + * {
          margin-left: 15px;
        }
      `
    )}
  />
));

export const Portal = ({ children }) => {
  return ReactDOM.createPortal(children, document.body);
};

export const Toolbar = React.forwardRef(({ className, ...props }: any, ref) => (
  <Menu
    {...props}
    ref={ref}
    className={cx(
      className,
      css`
        position: relative;
        padding: 10px;
        margin-bottom: 2px;
        display: flex;
        height: 2.5rem;
        font-size: 1.6rem;
      `
    )}
  />
));

export const BlockButton = ({ format, icon, children }: any) => {
  const editor = useSlate();
  return (
    <Button
      active={isBlockActive(editor, format)}
      onMouseDown={event => {
        event.preventDefault();
        toggleBlock(editor, format);
      }}
    >
      {children ?? ''}
    </Button>
  );
};

export const MarkButton = ({ format, icon, children }: any) => {
  const editor = useSlate();
  return (
    <Button
      active={isMarkActive(editor, format)}
      onMouseDown={event => {
        event.preventDefault();
        toggleMark(editor, format);
      }}
    >
      {children ?? ''}
    </Button>
  );
};

export const LinkButton = () => {
  const editor = useSlate();
  return (
    <Button
      active={isLinkActive(editor)}
      onMouseDown={event => {
        event.preventDefault();
        const url = window.prompt("Enter the URL of the link:");
        if (!url) return;
        insertLink(editor, url);
      }}
    >
      <Icon>link</Icon>
    </Button>
  );
};
