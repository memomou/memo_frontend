import React from 'react'
import { CategoriesState } from '../../../types/post';
import { axiosInstance } from '../../../helpers/helper';
import { useSearchParams } from 'react-router-dom';

interface Props {
  selectedCategory: CategoriesState;
  setSelectedCategory: React.Dispatch<React.SetStateAction<CategoriesState | undefined>>;
  setAuthorCategories: React.Dispatch<React.SetStateAction<CategoriesState[]>>;
  setIsCategoryEditing: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function CategoryEditButton({selectedCategory, setSelectedCategory, setAuthorCategories, setIsCategoryEditing}: Props) {
  const [searchParams, setSearchParams] = useSearchParams();
  const handleDeleteCategory = async (categoryId: number) => {
    try {
      // 카테고리에 속한 게시글 수 확인
      const response = await axiosInstance.get('/posts', {
        params: {
          category_id: categoryId,
          take: 1
        }
      });

      if (response.data.posts.data.length > 0) {
        alert('이 카테고리에 게시글이 있어 삭제할 수 없습니다.');
        return;
      }

      if (window.confirm('정말로 이 카테고리를 삭제하시겠습니까?')) {
        await axiosInstance.delete(`/categories/${categoryId}`);
        setAuthorCategories(prevCategories =>
          prevCategories.filter(cat => cat.id !== Number(categoryId))
        );
        if (selectedCategory?.id === Number(categoryId)) {
          setSelectedCategory(undefined);
          // 쿼리 파라미터에서 카테고리 제거
          searchParams.delete('category');
          setSearchParams(searchParams);
        }
      }
    } catch (error) {
      console.error('카테고리 삭제 실패:', error);
      alert('카테고리 삭제 중 오류가 발생했습니다.');
    }
  };

  return (
    <div className="mdf">
      <button className="edit-btn" onClick={() => setIsCategoryEditing(true)}>변경</button>
      <span className="separator">|</span>
      <button className="delete-btn" onClick={() => handleDeleteCategory(selectedCategory.id)}>삭제</button>
    </div>
  )
}
