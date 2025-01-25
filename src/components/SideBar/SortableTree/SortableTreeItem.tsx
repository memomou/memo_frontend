import { Props, TreeItem } from './TreeItem';

export function SortableTreeItem({depth, ...props}: Props) {
  return (
      <TreeItem
        depth={depth}
        {...props}
      />
  );
}
