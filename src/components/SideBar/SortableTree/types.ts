import type {UniqueIdentifier} from '@dnd-kit/core';

export interface TreeItem {
  id: UniqueIdentifier;
  name: string;
  count: number;
  collapsed?: boolean;
  children: TreeItem[];
}

export type TreeItems = TreeItem[];

export interface FlattenedItem extends TreeItem {
  parentId: UniqueIdentifier | null;
  depth: number;
  index: number;
}

