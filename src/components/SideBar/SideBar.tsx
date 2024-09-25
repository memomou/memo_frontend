import { useParams, Link } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { authorAtom, authorCategoriesAtom, selectedCategoriesAtom, userAtom, UserState } from '../atom/atoms';
import CategoryList from './CategoryList';
import AddCategory from './AddCategory';
import { SideBarContainer } from './SideBar.style';
import { closestCenter, DndContext, DragEndEvent } from '@dnd-kit/core';
export function SideBar({ showAddCategory = true }) {
  const { nickname } = useParams();
  const [author] = useRecoilState(authorAtom);
  const [authorCategories, setAuthorCategories] = useRecoilState(authorCategoriesAtom);
  const [selectedCategory] = useRecoilState(selectedCategoriesAtom);
  const [currentUser] = useRecoilState(userAtom);

  const isCurrentUserOwner = currentUser?.id === author?.id;

  const handleAddCategory = (newCategory) => {
    setAuthorCategories([...authorCategories, newCategory]);
  };

  return (
    <SideBarContainer>
      <div className="nicknameWrapper">
        <Link to={`/${nickname}`}>
        <img
          src={author?.profileImage?.url || '/defaultAvatar.png'}
          alt={`${nickname}의 프로필`}
          className="profileImage"
        />
        <h1 className="nickname">@{nickname}</h1>
        </Link>
      </div>
      {author && (
        <CategoryList
          categories={authorCategories}
          selectedCategory={selectedCategory}
          author={author as UserState}
          setCategories={setAuthorCategories}
          isMyCategory={isCurrentUserOwner}
        />
      )}
      {isCurrentUserOwner && showAddCategory && (
        <AddCategory onAddCategory={handleAddCategory} />
      )}
    </SideBarContainer>
  );
}
