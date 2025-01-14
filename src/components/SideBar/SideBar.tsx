import { useParams, Link } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { authorAtom, authorCategoriesAtom, selectedCategoriesAtom, userAtom } from '../atom/atoms';
import CategoryList from './CategoryList';
import AddCategory from './AddCategory';
import { SideBarContainer } from './SideBar.style';
import { UserState } from '../../types/users.type';
export function SideBar({ showAddCategory = true, isTempPostPage = false }) {
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
      <div className="categoryListWrapper">
        {author && (
          <CategoryList
            categories={authorCategories}
            selectedCategory={selectedCategory}
            author={author as UserState}
            setCategories={setAuthorCategories}
            isMyCategory={isCurrentUserOwner}
          isTempPostPage={isTempPostPage}
        />
        )}
        {isCurrentUserOwner && showAddCategory && (
          <AddCategory onAddCategory={handleAddCategory} />
        )}
      </div>
    </SideBarContainer>
  );
}
