import React, {forwardRef, HTMLAttributes} from 'react';
import classNames from 'classnames';

import styles from './TreeItem.module.css';
import { TreeItem as TreeItemType } from './types';
import Collapse from './Collapse/Collapse';

export interface Props extends Omit<HTMLAttributes<HTMLLIElement>, 'id'> {
  childCount?: number;
  clone?: boolean;
  collapsed?: boolean;
  depth: number;
  indentationWidth: number;
  value: TreeItemType;
  onCollapse(): void;
}

export const TreeItem = forwardRef<HTMLDivElement, Props>(
  (
    {
      childCount,
      clone,
      depth,
      indentationWidth,
      collapsed,
      onCollapse,
      style,
      value,
      ...props
    },
    ref
  ) => {
    return (
      <li
        className={classNames(
          styles.Wrapper,
        )}
        style={
          {
            '--spacing': `${indentationWidth * depth}px`,
          } as React.CSSProperties
        }
        {...props}
      >
        <div className={`${styles.TreeItem}`} ref={ref} style={style}>
          {depth === 0 && <Collapse collapsed={!!collapsed} onCollapse={onCollapse} disabled={!onCollapse} />}
          <span className={styles.Text}>{value.name}</span>

          <span className={styles.ItemCount}>({value.count})</span>
          {clone && childCount && childCount > 1 ? (
            <span className={styles.Count}>{childCount}</span>
          ) : null}
        </div>
      </li>
    );
  }
);
