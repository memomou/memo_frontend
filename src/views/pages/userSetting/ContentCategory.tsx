import React, { useState, useMemo, useEffect } from "react";
import { SortableTree } from "./dnd-kit/Tree/SortableTree";
import { useCategories } from "../newPost/useCategories";
import { CategoryType } from "../../../types/post";
import { TreeItem } from "./dnd-kit/Tree/types";
import { UniqueIdentifier } from "@dnd-kit/core";
import { flattenTree, removeItem } from "./dnd-kit/Tree/utilities";
import { axiosInstance } from "../../../helpers/helper";
export default function ContentCategory() {
  const { categories, setCategories } = useCategories();
  const [items, setItems] = useState<TreeItem[]>([]);
  const flattenedItems = useMemo(() => {
    return flattenTree(items);
  }, [items]);

  const refactorCategories = useMemo(() => {
    const convert = (categories: CategoryType[] | undefined): TreeItem[] => {
      if (!categories || categories.length === 0) return [];

      return categories.map((category) => ({
        id: category.id,
        name: category.categoryName,
        children: convert(category.children),
        count: category.postCount,
        tempPostCount: category.tempPostCount,
      }));
    };

    return convert;
  }, []);

  const handleRemove = async (id: UniqueIdentifier) => {
    // 삭제하는데, 하위 카테고리에 게시글이 있으면 삭제 불가능
    if (flattenedItems.some((item) => item.parentId === id)) {
      alert('하위 카테고리에 게시글이 있어 삭제할 수 없습니다.');
      return;
    }
    // 삭제하는데, 삭제하는 카테고리에 게시글이 있으면 삭제 불가능
    const item = flattenedItems.find((item) => item.id === id);
    if (item && item.count && item.count > 0) {
      alert('삭제하는 카테고리에 게시글이 있어 삭제할 수 없습니다.');
      return;
    }

    if (window.confirm('정말로 이 카테고리를 삭제하시겠습니까?')) {
      try {
        await axiosInstance.delete(`/categories/${id}`);
        setItems((items) => removeItem(items, id));
      } catch (error) {
        console.error('카테고리 삭제 실패:', error);
        alert('카테고리 삭제 중 오류가 발생했습니다.');
      }
    }
  };

  useEffect(() => {
    const refactoredCategories = refactorCategories(categories);
    setItems(refactoredCategories);
  }, [categories, refactorCategories]);

  return (
    <div className="p-6">
      <h1 className="text-2xl text-center">카테고리 관리</h1>
      <div className="mt-4">
        <SortableTree collapsible removable handleRemove={handleRemove} items={items} setItems={setItems} />
      </div>
    </div>
  );


}

