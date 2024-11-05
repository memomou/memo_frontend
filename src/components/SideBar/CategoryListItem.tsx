import React, { forwardRef } from 'react';
import { Link } from 'react-router-dom';
import { RiDraggable } from 'react-icons/ri';
import { CategoryItemStyle } from './CategoryItem.style';

interface CategoryListItemProps {
  to: string;
  isSelected: boolean;
  categoryName: string;
  postCount?: number;
  isMyCategory?: boolean;
  dragAttributes?: any;
  dragListeners?: any;
  style?: React.CSSProperties;
}

export const CategoryListItem = forwardRef<HTMLDivElement, CategoryListItemProps>(({
  to,
  isSelected,
  categoryName,
  postCount,
  isMyCategory,
  dragAttributes,
  dragListeners,
  style,
}, ref) => {
  return (
    <CategoryItemStyle ref={ref} style={style}>
      <div className={`buttonWrapper ${isSelected ? "selected" : ""}`}>
        <Link
          className="categoryContent"
          to={to}
        >
          <span className='categoryName'>{categoryName}</span>
          <span className='postCount'>{postCount}</span>
        </Link>
      </div>
      <div className={`dragButtonWrapper ${isMyCategory || 'hidden'}`}>
          <button {...dragAttributes} {...dragListeners} className='dragButton'>
            <RiDraggable />
          </button>
      </div>
    </CategoryItemStyle>
  );
});
