import React, { useState, useEffect, useCallback, useMemo } from "react";
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

export const Content = React.memo(({selectedCategory, setSelectedCategory, currentUser, isTempPostPage = false}: ContentProps) => {
  const [author] = useRecoilState(authorAtom);
  const [posts, setPosts] = useState<PostType[]>([]);
  const [nextUrl, setNextUrl] = useState<string | null>(null);
  const [searchInputValue, setSearchInputValue] = useState('');

  // 카테고리 ID 계산을 메모이제이션
  const categoryIds = useMemo(() => {
    if (!selectedCategory?.id) return undefined;
    return selectedCategory.children 
      ? [selectedCategory.id, ...selectedCategory.children.map((child) => child.id)]
      : [selectedCategory.id];
  }, [selectedCategory]);

  // 요청 파라미터 메모이제이션
  const requestParams = useMemo(() => ({
    searchValue: searchInputValue,
    categoryIds,
    statusId: isTempPostPage ? PostStatus.DRAFT : PostStatus.PUBLISHED,
    authorId: author?.id
  }), [searchInputValue, categoryIds, isTempPostPage, author?.id]);

  // 무한 스크롤 처리
  const loadMore = useCallback(() => {
    if (nextUrl) {
      fetchPosts({
        appendUrl: nextUrl,
        requestParams,
        funcList: [
          setPosts,
          setNextUrl
        ]
      });
    }
  }, [nextUrl, requestParams]);

  const observerRef = useInfiniteScroll({
    fetchMore: loadMore,
    hasMore: !!nextUrl
  });

  // 초기 데이터 로드
  useEffect(() => {
    const fetchInitialPosts = async () => {
      try {
        if (requestParams.authorId) {
        await fetchPosts({
          requestParams,
            funcList: [
              setPosts,
              setNextUrl
            ]
          });
        }
      } catch (error) {
        console.error('Failed to fetch initial posts:', error);
      }
    };

    fetchInitialPosts();
  }, [requestParams]);

  // 검색 입력 핸들러 메모이제이션
  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInputValue(e.target.value);
  }, []);

  useEffect(() => {
    console.log('posts: ', posts);
  }, [posts]);

  // 파생 상태 메모이제이션
  const { isSearchMode, isSearchedPostEmpty } = useMemo(() => ({
    isSearchMode: !!searchInputValue,
    isSearchedPostEmpty: !!searchInputValue && posts.length === 0
  }), [searchInputValue, posts.length]);

  // 헤더 텍스트 메모이제이션
  const headerText = useMemo(() => {
    if (searchInputValue) {
      return `- 검색 결과 (${posts.length})`;
    }
    return (
      <span className="categoryName">
        - {selectedCategory?.categoryName || "전체 게시글"}
      </span>
    );
  }, [searchInputValue, posts.length, selectedCategory?.categoryName]);

  return (
    <ContentContainer>
      <div className="recentPosterWrapper">
        <div className="topContainer">
          <span className="recentPostText">
            {headerText}
          </span>
          <SearchInput 
            value={searchInputValue} 
            onChange={handleInputChange} 
          />
        </div>
        <PostList
          isSearchMode={isSearchedPostEmpty}
          posts={posts}
        />
        <div ref={observerRef} style={{ height: '10px' }} />
      </div>
    </ContentContainer>
  );
});

Content.displayName = 'Content';

export default Content;
