import React, { useState, useEffect, useCallback } from "react";
import { useRecoilState } from "recoil";
import {ContentContainer} from './Content.style';
import { authorAtom, authorCategoriesAtom } from "../../../components/atom/atoms";
import { CategoryType, PostStatus, PostType } from "../../../types/post";
import SearchInput from "../../../components/Input/SearchInput";
import { UserState } from "../../../types/users.type";
import { fetchPosts } from "../../../utils/fetchPosts";
import CategoryEditButton from "./CategoryEditButton";
import CategoryForm from "./CategoryForm";
import PostList from "../../../components/PostList/PostList";
import { useInfiniteScroll } from "../root/useInfiniteScroll";

interface ContentProps {
  selectedCategory?: CategoryType;
  setSelectedCategory: React.Dispatch<React.SetStateAction<CategoryType | undefined>>;
  currentUser?: UserState;
  isTempPostPage?: boolean;
}

export const Content = ({selectedCategory, setSelectedCategory, currentUser, isTempPostPage = false}: ContentProps) => {
  const [author] = useRecoilState(authorAtom);
  const [,setAuthorCategories] = useRecoilState(authorCategoriesAtom);
  const [posts, setPosts] = useState<PostType[]>([]);
  const [nextUrl, setNextUrl] = useState<string | null>(null);
  const [searchInputValue, setSearchInputValue] = useState('');

  // 무한 스크롤 처리
  const loadMore = useCallback(() => {
    if (nextUrl) {
      console.log('nextUrl Called');
      fetchPosts({appendUrl: nextUrl, requestParams: {searchValue: searchInputValue, categoryId: selectedCategory?.id, statusId: isTempPostPage ? PostStatus.DRAFT : PostStatus.PUBLISHED, authorId: author?.id}, funcList: [setPosts, setNextUrl]});
    }
  }, [nextUrl, searchInputValue, selectedCategory, isTempPostPage, author?.id]);

  const observerRef = useInfiniteScroll({
    fetchMore: loadMore,
    hasMore: !!nextUrl
  });
  const [isCategoryEditing, setIsCategoryEditing] = useState(false);

    // 파생 상태
    const isSearchMode = !!searchInputValue;
    const isSearchedPostEmpty = isSearchMode && posts.length === 0;

  useEffect(() => {
    console.log("Fetching posts...");
    fetchPosts({requestParams: {searchValue: searchInputValue, categoryId: selectedCategory?.id, statusId: isTempPostPage ? PostStatus.DRAFT : PostStatus.PUBLISHED, authorId: author?.id}, funcList: [setPosts, setNextUrl]});
  }, [searchInputValue, selectedCategory, isTempPostPage, author?.id]);

  const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInputValue(e.target.value);
    console.log(e.target.value);
  }

  return (
    <ContentContainer>
      <div className="recentPosterWrapper">
        <div className="topContainer">
          <span className="recentPostText">
              {searchInputValue ? `- 검색 결과 (${posts.length})` :
                isCategoryEditing && selectedCategory ? <CategoryForm selectedCategory={selectedCategory} setAuthorCategories={setAuthorCategories} setIsCategoryEditing={setIsCategoryEditing} /> : (
                  <span className="categoryName">
                    - {selectedCategory?.categoryName || "전체 게시글"}
                  </span>
                )
              }
            {currentUser?.id === author?.id && selectedCategory && !isCategoryEditing && <CategoryEditButton selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} setAuthorCategories={setAuthorCategories} setIsCategoryEditing={setIsCategoryEditing} />}
          </span>
          <SearchInput value={searchInputValue} onChange={handleInputChange} />
        </div>
        <PostList
          isSearchMode={isSearchedPostEmpty}
          posts={posts}
        />
        <div ref={observerRef} style={{ height: '10px' }} />
      </div>
    </ContentContainer>
  );
};

export default Content;
