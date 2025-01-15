import React, { useState } from 'react'
import { useSearchParams } from 'react-router-dom';
import { axiosInstance } from '../../../helpers/helper';
import { CategoryType } from '../../../types/post';

interface Props {
  selectedCategory: CategoryType;
  setAuthorCategories: React.Dispatch<React.SetStateAction<CategoryType[]>>;
  setIsCategoryEditing: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function CategoryForm({selectedCategory, setAuthorCategories, setIsCategoryEditing}: Props) {
  const [editCategoryName, setEditCategoryName] = useState(selectedCategory?.categoryName || "");
  const [,setSearchParams] = useSearchParams();

  const handleUpdateCategory = async (categoryId: number) => {
    try {
      const body = { categoryName: editCategoryName };
      console.log('카테고리 업데이트 요청 body:', body);
      console.log('카테고리 업데이트 요청 categoryId:', categoryId);

      const response = await axiosInstance.patch(`/categories/${categoryId}`, body);
      const updatedCategory = response.data;
      setAuthorCategories(prevCategories =>
        prevCategories.map(cat => cat.id === Number(categoryId) ? updatedCategory : cat)
      );
      setIsCategoryEditing(false);

      // URL 쿼리 파라미터 업데이트
      if (selectedCategory?.id === Number(categoryId)) {
        setSearchParams({ category: editCategoryName });
      }
    } catch (error) {
      console.error('카테고리 수정 실패:', error);
    }
  };

  return (
    <>
      <input
        value={editCategoryName}
        onChange={(e) => setEditCategoryName(e.target.value)}
      />
      <div className="mdf">
        <button className="save-btn" onClick={() => handleUpdateCategory(selectedCategory.id)}>저장</button>
        <span className="separator">|</span>
        <button className="cancel-btn" onClick={() => setIsCategoryEditing(false)}>취소</button>
      </div>
    </>
  )
}
