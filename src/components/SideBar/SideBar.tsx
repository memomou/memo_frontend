import { useParams, Link, useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { authorAtom, authorCategoriesAtom, selectedCategoriesAtom, userAtom } from '../atom/atoms';
import CategoryList from './CategoryList';
import { SideBarContainer } from './SideBar.style';
import { UserState } from '../../types/users.type';
import { useEffect, useMemo, useState } from 'react';
import { TreeItem } from './SortableTree/types';
import { SortableTree } from './SortableTree/SortableTree';
import { CategoryTreeItem } from './CategoryTreeItem';
import { CategoryType } from '../../types/post';
import { UniqueIdentifier } from '@dnd-kit/core';
import { flattenTree } from './SortableTree/utilities';
export function SideBar({ isTempPostPage = false }) {
  const { nickname } = useParams();
  const [author] = useRecoilState(authorAtom);
  const [authorCategories, setAuthorCategories] = useRecoilState(authorCategoriesAtom);
  const [selectedCategory] = useRecoilState(selectedCategoriesAtom);
  const [currentUser] = useRecoilState(userAtom);
  const navigate = useNavigate();
  const isCurrentUserOwner = currentUser?.id === author?.id;

  const [items, setItems] = useState<TreeItem[]>([]);
  const flattenedItems = useMemo(() => {
    return flattenTree(items);
  }, [items]);

  const refactorCategories = useMemo(() => {
    const convert = (categories: CategoryType[] | undefined): TreeItem[] => {
      if (!categories || categories.length === 0) return [];

      return categories.map((category) => ({
        id: category.id,
        name: category.categoryName,
        children: convert(category.children),
        count: category.postCount,
        tempPostCount: category.tempPostCount,
        pos: category.pos,
      }));
    };

    return convert;
  }, []);
  useEffect(() => {
    const refactoredCategories = refactorCategories(authorCategories);
    setItems(refactoredCategories);
    console.log('refactoredCategories', refactoredCategories);
  }, [authorCategories, refactorCategories]);

  const onContentClick = (id: UniqueIdentifier) => {
    const category = flattenedItems.find((item) => item.id === id);
    const parentCategory = category?.parentId ? flattenedItems.find((item) => item.id === category?.parentId) : null;
    if (parentCategory) {
      navigate(`/${author?.nickname}?category=${parentCategory?.name.replaceAll(' ', '+')}&subCategory=${category?.name.replaceAll(' ', '+')}`);
    } else {
      navigate(`/${author?.nickname}?category=${category?.name.replaceAll(' ', '+')}`);
    }
  }

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
      {/* <div className="categoryListWrapper">
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
      </div> */}
      <SortableTree collapsible items={items} setItems={setItems} renderItem={CategoryTreeItem} onContentClick={onContentClick} />
    </SideBarContainer>
  );

}
