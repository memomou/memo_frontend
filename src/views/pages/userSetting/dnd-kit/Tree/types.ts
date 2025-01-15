import type {MutableRefObject} from 'react';
import type {UniqueIdentifier} from '@dnd-kit/core';

// 추가 필드
export interface AdditionalItem {
  id: UniqueIdentifier;
  name: string;
  pos?: number;
  count?: number;
}

// 기존 필드
export interface TreeItem extends AdditionalItem {
  children: TreeItem[];
  collapsed?: boolean;
}

export type TreeItems = TreeItem[];

export interface FlattenedItem extends TreeItem {
  parentId: UniqueIdentifier | null;
  depth: number;
  index: number;
}

export type SensorContext = MutableRefObject<{
  items: FlattenedItem[];
  offset: number;
}>;
