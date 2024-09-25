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

  function handleDragEnd(event: DragEndEvent): void {
    console.log(event);
  }

  return (
    <SideBarContainer>
      <div className="nicknameWrapper">
        <img
          src={author?.profileImage?.url || '/defaultAvatar.png'}
          alt={`${nickname}의 프로필`}
          className="profileImage"
        />
        <h1 className="nickname">@{nickname}</h1>
      </div>
        <CategoryList
          categories={authorCategories}
          selectedCategory={selectedCategory}
          author={author as UserState}
        />
      {isCurrentUserOwner && showAddCategory && (
        <AddCategory onAddCategory={handleAddCategory} />
      )}
    </SideBarContainer>
  );
}
