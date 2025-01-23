import { CategoryType } from '../../types/post';
import { useSortable } from '@dnd-kit/sortable'
import {CSS} from '@dnd-kit/utilities';
import { CategoryListItem } from './CategoryListItem'
import { UserState } from '../../types/users.type';
interface CategoryItemProps {
  category: CategoryType
  author: UserState
  index: number
  isSelected: boolean
  isMyCategory: boolean
  navigateToBase: string
}

export default function CategoryItem({ category, author, index, isSelected, isMyCategory, navigateToBase }: CategoryItemProps) {
  return (
    <CategoryListItem
      key={category.id || `category-${index}`}
      to={`${navigateToBase}?category=${category.categoryName}`}
      isSelected={isSelected}
      categoryName={category.categoryName}
      postCount={category.postCount}
      isMyCategory={isMyCategory}
    />
  )
}
