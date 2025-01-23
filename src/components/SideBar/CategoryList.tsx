import { CategoryType } from '../../types/post';
import CategoryItem from './CategoryItem';
import { CategoryListItem } from './CategoryListItem';
import { UserState } from '../../types/users.type';

interface CategoryListProps {
  categories: CategoryType[];
  selectedCategory: CategoryType | undefined;
  author: UserState;
  setCategories: React.Dispatch<React.SetStateAction<CategoryType[]
  >>;
  isMyCategory: boolean;
  isTempPostPage: boolean;
}

const CategoryList: React.FC<CategoryListProps> = ({ categories, setCategories, selectedCategory, author, isMyCategory, isTempPostPage }) => {
  const navigateToBase = isTempPostPage ? `/${author.nickname}/posts/saves` : `/${author.nickname}`;

  return (
    <>
      <CategoryListItem
        to={navigateToBase}
        isSelected={!selectedCategory}
        categoryName="전체 게시글"
        isMyCategory={false}
      />
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
    </>
  );
};

export default CategoryList;
