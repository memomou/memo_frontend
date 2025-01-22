import { getItemsNotFinished, getDeletedItems, getAddedItems, getChangedItems } from "./ContentCategory.fn";
import React, { useState, useMemo, useEffect } from "react";
import { SortableTree } from "../dnd-kit/Tree/SortableTree";
import { useCategories } from "../../newPost/useCategories";
import { CategoryType } from "../../../../types/post";
import { TreeItem } from "../dnd-kit/Tree/types";
import { UniqueIdentifier } from "@dnd-kit/core";
import { flattenTree } from "../dnd-kit/Tree/utilities";
import { axiosInstance } from "../../../../helpers/helper";

export default function ContentCategory() {
  const { categories, setCategories } = useCategories();
  const [items, setItems] = useState<TreeItem[]>([]);
  const flattenedItems = useMemo(() => {
    return flattenTree(items);
  }, [items]);
  const [newCategoryId, setNewCategoryId] = useState(-1);
  const [isChanged, setIsChanged] = useState(false);
  const refactorCategories = useMemo(() => {
    const convert = (categories: CategoryType[] | undefined): TreeItem[] => {
      if (!categories || categories.length === 0) return [];

      return categories.map((category) => ({
        id: category.id,
        name: category.categoryName,
        children: convert(category.children),
        count: category.postCount,
        tempPostCount: category.tempPostCount,
        pos: category.pos,
      }));
    };

    return convert;
  }, []);

  const originItems = refactorCategories(categories);

  const handleItemChanged = (id: UniqueIdentifier) => {
    setIsChanged(true);
  };

  const handleAdd = () => {
    console.log('카테고리 추가');
    console.log('items', items);
    setItems((items) => [...items, { id: newCategoryId, name: '새 카테고리', children: [], count: 0, tempPostCount: 0, pos: 0, isEditing: true }]);
    setNewCategoryId(newCategoryId - 1);
  };

  const handleApply = async () => {
    const itemsNotFinished = getItemsNotFinished(flattenedItems);
    if (itemsNotFinished.length > 0) {
      alert('변경사항이 완료되지 않았습니다.');
      return;
    }
    console.log('originItems', originItems);
    console.log('flattenedItems', flattenedItems);
    const originalFlattenedItems = flattenTree(originItems).map((item) => ({...item, index: item.pos}));
    console.log('originalFlattenedItems', originalFlattenedItems);
    console.log('flattenedItems', flattenedItems);
    // 변경사항 적용
    // 삭제 대상
    const deletedItems = getDeletedItems(originalFlattenedItems, flattenedItems);
    console.log('deletedItems', deletedItems);
    // 추가 대상
    const addedItems = getAddedItems(originalFlattenedItems, flattenedItems).map((item) => ({...item, categoryName: item.name, pos: item.index, parentId: item.parentId}));
    console.log('addedItems', addedItems);
    // 변경 대상
    const changedItems = getChangedItems(originalFlattenedItems, flattenedItems).map((item) => ({...item, categoryName: item.name, pos: item.index, parentId: item.parentId}));
    console.log('changedItems', changedItems);

    if (deletedItems.length + addedItems.length + changedItems.length === 0) {
      alert('변경사항이 없습니다.');
      return;
    }

    const response = await axiosInstance.patch('/categories/list', {
      categoryIdsToDelete: deletedItems.map((item) => item.id),
      categoriesToAdd: addedItems,
      categoriesToUpdate: changedItems,
    });

    console.log('response', response.data.categories);
    setCategories(response.data.categories);
    alert('카테고리 변경사항이 적용되었습니다.');
  };


  useEffect(() => {
    const refactoredCategories = refactorCategories(categories);
    setItems(refactoredCategories);
  }, [categories, refactorCategories]);

  return (
    <div className="p-6">
      <h1 className="text-2xl text-center">카테고리 관리</h1>
      <div className="mt-4">
        <SortableTree collapsible removable indicator items={items} setItems={setItems} handleItemChanged={handleItemChanged} />
        <div className="bg-gray-100 px-4 py-2 cursor-pointer border border-gray-300 border-solid" onClick={handleAdd}>+ 카테고리 추가</div>
      </div>
      <div className="flex justify-end mt-4">
        <button className={`px-4 py-2 border border-gray-300 border-solid ${isChanged ? 'bg-gray-100 text-gray-700' : 'bg-gray-100 text-gray-500 cursor-not-allowed'}`} onClick={handleApply}>
          카테고리 변경사항 적용
        </button>
      </div>
    </div>
  );
}

