import { CategoriesState } from '../../types/post';

import { closestCenter, DndContext, DragEndEvent } from '@dnd-kit/core';
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import CategoryItem from './CategoryItem';
import { axiosInstance } from '../../helpers/helper';
import { CategoryListItem } from './CategoryListItem';
import { UserState } from '../../types/users.type';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';

interface CategoryListProps {
  categories: CategoriesState[];
  selectedCategory: CategoriesState | undefined;
  author: UserState;
  setCategories: React.Dispatch<React.SetStateAction<CategoriesState[]
  >>;
  isMyCategory: boolean;
  isTempPostPage: boolean;
}

const CategoryList: React.FC<CategoryListProps> = ({ categories, setCategories, selectedCategory, author, isMyCategory, isTempPostPage }) => {
  const navigateToBase = isTempPostPage ? `/${author.nickname}/posts/saves` : `/${author.nickname}`;
  async function handleDragEnd(event: DragEndEvent) {
    const {active, over} = event;
    if (over && active.id !== over.id) {
      const currentCategories = categories;
      const oldIndex = categories.findIndex(category => category.id === active.id);
      const newIndex = categories.findIndex(category => category.id === over.id);
      const newCategories = arrayMove(categories, oldIndex, newIndex);
      setCategories(newCategories);
      try{
        const response = await axiosInstance.patch(`/categories/reorder`, {
          categoryOrders: newCategories.map((category, index) => ({id: category.id, pos: index}))
        });
        console.log(response);
      } catch (error) {
        setCategories(currentCategories);
      }
    }
  }

  return (
    <DndContext
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
      modifiers={[restrictToVerticalAxis]}
    >
      <CategoryListItem
        to={navigateToBase}
        isSelected={!selectedCategory}
        categoryName="전체 게시글"
        isMyCategory={false}
      />

      <SortableContext
        items={categories}
        strategy={verticalListSortingStrategy}
      >
      {categories.map((category, index) => (
        <CategoryItem
          key={category.id || `category-${index}`}
          category={category}
          author={author}
          isSelected={category.id === selectedCategory?.id}
          index={index}
          isMyCategory={isMyCategory}
          navigateToBase={navigateToBase}
        />
        ))}
        </SortableContext>
    </DndContext>
  );
};

export default CategoryList;
