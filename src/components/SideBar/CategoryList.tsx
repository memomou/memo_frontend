import { Link } from 'react-router-dom';
import { CategoriesState, UserState } from '../atom/atoms';
import { closestCenter, DndContext, DragEndEvent } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import CategoryItem from './CategoryItem';
import { CategoryItemStyle } from './CategoryItem.style';

interface CategoryListProps {
  categories: CategoriesState[];
  selectedCategory: CategoriesState | undefined;
  author: UserState;
}

const CategoryList: React.FC<CategoryListProps> = ({ categories, selectedCategory, author }) => {
  function handleDragEnd(event: DragEndEvent): void {
    throw new Error('Function not implemented.');
  }

  return (
    <DndContext
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <CategoryItemStyle className={`category ${!selectedCategory ? "selected" : ""}`}>
        <Link
          className="categoryName"
          to={`/${author.nickname}`}
        >
          전체 게시글
        </Link>
      </CategoryItemStyle>
      <SortableContext
        items={categories}
        strategy={verticalListSortingStrategy}
      >
      {categories.map((category, index) => (
        <CategoryItem key={category.id || `category-${index}`} category={category} author={author} isSelected={category.id === selectedCategory?.id} index={index} />
        ))}
        </SortableContext>
    </DndContext>
  );
};

export default CategoryList;
