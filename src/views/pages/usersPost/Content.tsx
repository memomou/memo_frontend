import React, { useState, useEffect, useCallback } from "react";
import { useRecoilState } from "recoil";
import {ContentContainer} from './Content.style';
import { authorAtom, authorCategoriesAtom } from "../../../components/atom/atoms";
import { CategoryType, PostStatus, PostType } from "../../../types/post";
import SearchInput from "../../../components/Input/SearchInput";
import { UserState } from "../../../types/users.type";
import { fetchPosts } from "../../../utils/fetchPosts";
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
  const [posts, setPosts] = useState<PostType[]>([]);
  const [nextUrl, setNextUrl] = useState<string | null>(null);
  const [searchInputValue, setSearchInputValue] = useState('');

  // 무한 스크롤 처리
  const loadMore = useCallback(() => {
    if (nextUrl) {
      const categoryIds = selectedCategory?.id ? selectedCategory.children ? [selectedCategory.id, ...selectedCategory.children.map((child) => child.id)] : [selectedCategory.id] : undefined;
      fetchPosts({appendUrl: nextUrl, requestParams: {searchValue: searchInputValue, categoryIds, statusId: isTempPostPage ? PostStatus.DRAFT : PostStatus.PUBLISHED, authorId: author?.id}, funcList: [setPosts, setNextUrl]});
    }
  }, [nextUrl, searchInputValue, selectedCategory, isTempPostPage, author?.id]);

  const observerRef = useInfiniteScroll({
    fetchMore: loadMore,
    hasMore: !!nextUrl
  });

  // 파생 상태
  const isSearchMode = !!searchInputValue;
  const isSearchedPostEmpty = isSearchMode && posts.length === 0;

  useEffect(() => {
    console.log("Fetching posts...");
    console.log('selectedCategory: ', selectedCategory);
    const categoryIds = selectedCategory?.id ? selectedCategory.children ? [selectedCategory.id, ...selectedCategory.children.map((child) => child.id)] : [selectedCategory.id] : undefined;
    fetchPosts({requestParams: {searchValue: searchInputValue, categoryIds, statusId: isTempPostPage ? PostStatus.DRAFT : PostStatus.PUBLISHED, authorId: author?.id}, funcList: [setPosts, setNextUrl]});
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
                <span className="categoryName">
                  - {selectedCategory?.categoryName || "전체 게시글"}
                </span>
              }
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
