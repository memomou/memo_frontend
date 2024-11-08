import React from 'react'
import { Link } from 'react-router-dom'
import { CategoriesState, UserState } from '../atom/atoms'
import { CategoryItemStyle } from './CategoryItem.style'
import { useSortable } from '@dnd-kit/sortable'
import {CSS} from '@dnd-kit/utilities';
import { RiDraggable } from "react-icons/ri";
import { CategoryListItem } from './CategoryListItem'

interface CategoryItemProps {
  category: CategoriesState
  author: UserState
  index: number
  isSelected: boolean
  isMyCategory: boolean
  navigateToBase: string
}

export default function CategoryItem({ category, author, index, isSelected, isMyCategory, navigateToBase }: CategoryItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({id: category.id});

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <CategoryListItem
      key={category.id || `category-${index}`}
      ref={setNodeRef}
      style={style}
      to={`${navigateToBase}?category=${category.categoryName}`}
      isSelected={isSelected}
      categoryName={category.categoryName}
      postCount={category.postCount}
      isMyCategory={isMyCategory}
      dragAttributes={attributes}
      dragListeners={listeners}
    />
  )
}
