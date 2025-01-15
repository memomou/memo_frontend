import React from 'react'
import { CategoryType } from '../../../types/post'
import NavMenu from './NavMenu'
import { useLocation } from 'react-router-dom';

interface Props {
  selectedCategory?: CategoryType,
  authorCategories: CategoryType[],
}

export default function CategoryMenu({selectedCategory, authorCategories}: Props) {
  const currentPath = useLocation().pathname;
  return (
    <NavMenu
      title={selectedCategory?.categoryName || '전체 게시글'}
      navList={[ ...authorCategories?.map((category) => ({
        title: category.categoryName,
        link: `${currentPath}?category=${category.categoryName}`,
      }))]}
    />
  )
}

