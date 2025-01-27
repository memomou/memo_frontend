import { CategoryType } from '../types/post';
import { TreeItem } from '../components/SideBar/SortableTree/types';

export const convertCategoriesToTreeItems = (categories: CategoryType[] | undefined): TreeItem[] => {
  if (!categories || categories.length === 0) return [];

  return categories.map((category) => ({
    id: category.id,
    name: category.categoryName,
    children: convertCategoriesToTreeItems(category.children),
    count: category.postCount,
    tempPostCount: category.tempPostCount,
    pos: category.pos,
  }));
};

interface HasChildren<T> {
  children?: T[];
}

export const findRecursively = <T extends HasChildren<T>>(
  items: T[],
  predicate: (item: T) => boolean,
): T | undefined => {
  for (const item of items) {
    if (predicate(item)) {
      return item;
    }

    if (item.children && item.children.length > 0) {
      const found = findRecursively(item.children, predicate);
      if (found) return found;
    }
  }

  return undefined;
};
