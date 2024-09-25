import React from 'react'
import { Link } from 'react-router-dom'
import { CategoriesState, UserState } from '../atom/atoms'
import { CategoryItemStyle } from './CategoryItem.style'
import { useSortable } from '@dnd-kit/sortable'
import {CSS} from '@dnd-kit/utilities';
import { RiDraggable } from "react-icons/ri";

interface CategoryItemProps {
  category: CategoriesState
  author: UserState
  index: number
  isSelected: boolean
  isMyCategory: boolean
}

export default function CategoryItem({ category, author, index, isSelected, isMyCategory }: CategoryItemProps) {
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
      <CategoryItemStyle className={`${isSelected ? " selected" : ""}`}
        ref={setNodeRef} style={style}
      >
        <Link
          className="categoryName"
          to={`/${author.nickname}?category=${category.categoryName}`}
          key={category.id || `category-${index}`}
        >
          {category.categoryName}
        </Link>
        {isMyCategory &&
        <button {...attributes} {...listeners} className='dragButton'>
          <RiDraggable />
        </button>}
      </CategoryItemStyle>
  )
}
