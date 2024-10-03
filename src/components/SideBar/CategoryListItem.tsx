import React, { forwardRef } from 'react';
import { Link } from 'react-router-dom';
import { RiDraggable } from 'react-icons/ri';
import { CategoryItemStyle } from './CategoryItem.style';

interface CategoryListItemProps {
  to: string;
  isSelected: boolean;
  categoryName: string;
  isMyCategory?: boolean;
  dragAttributes?: any;
  dragListeners?: any;
  style?: React.CSSProperties;
}

export const CategoryListItem = forwardRef<HTMLDivElement, CategoryListItemProps>(({
  to,
  isSelected,
  categoryName,
  isMyCategory,
  dragAttributes,
  dragListeners,
  style
}, ref) => {
  return (
    <CategoryItemStyle ref={ref} style={style}>
      <div className={`buttonWrapper ${isSelected ? "selected" : ""}`}>
        <Link
          className="categoryName"
          to={to}
        >
          {categoryName}
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
