import { FlattenedItem } from "../dnd-kit/Tree/types";

const getItemsNotFinished = (items: FlattenedItem[]) => {
  return items.filter((item) => !!item.isEditing);
};

const getDeletedItems = (originalFlattenedItems: FlattenedItem[], changedFlattenedItems: FlattenedItem[]) => {
  return originalFlattenedItems.filter((originalItem) => !changedFlattenedItems.some((flattenedItem) => flattenedItem.id === originalItem.id));
};

const getAddedItems = (originalFlattenedItems: FlattenedItem[], changedFlattenedItems: FlattenedItem[]) => {
  return changedFlattenedItems.filter((changedItem) => !originalFlattenedItems.some((originalItem) => originalItem.id === changedItem.id));
};

const getChangedItems = (originalFlattenedItems: FlattenedItem[], changedFlattenedItems: FlattenedItem[]) => {
  return changedFlattenedItems.filter((changedItem) => originalFlattenedItems.some((originalItem) =>
    originalItem.id === changedItem.id &&
      (originalItem.name !== changedItem.name
        || originalItem.index !== changedItem.index
        || originalItem.parentId !== changedItem.parentId
      )
    )
  );
};

export { getItemsNotFinished, getDeletedItems, getAddedItems, getChangedItems };
