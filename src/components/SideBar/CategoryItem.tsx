import React from 'react'
import { Link } from 'react-router-dom'
import { CategoriesState, UserState } from '../atom/atoms'
import { CategoryItemStyle } from './CategoryItem.style'

interface CategoryItemProps {
  category: CategoriesState
  author: UserState
  index: number
  isSelected: boolean
}

export default function CategoryItem({ category, author, index, isSelected }: CategoryItemProps) {
  return (
      <CategoryItemStyle className={`${isSelected ? " selected" : ""}`}>
        <Link
          className="categoryName"
          to={`/${author.nickname}?category=${category.categoryName}`}
          key={category.id || `category-${index}`}
        >
          {category.categoryName}
        </Link>

      </CategoryItemStyle>
  )
}
