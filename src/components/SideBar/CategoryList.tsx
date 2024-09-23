import { Link } from 'react-router-dom';
import { CategoriesState, UserState } from '../atom/atoms';

interface CategoryListProps {
  categories: CategoriesState[];
  selectedCategory: CategoriesState | undefined;
  author: UserState;
}

const CategoryList: React.FC<CategoryListProps> = ({ categories, selectedCategory, author }) => {
  return (
    <>
      {categories.map((category, index) => (
        <Link
          to={`/${author.nickname}?category=${category.categoryName}`}
          key={category.id || `category-${index}`}
        >
          <div className={`category${category.id === selectedCategory?.id ? " selected" : ""}`}>
            <span className="categoryName">{category.categoryName}</span>
          </div>
        </Link>
      ))}
    </>
  );
};

export default CategoryList;
