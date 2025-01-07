import { useEffect, useState, useCallback } from "react";
import { ContentContainer } from './Content.style';
import { PostType } from "../../../types/post";
import PostList from "../../../components/PostList/PostList";
import SearchInput from "../../../components/Input/SearchInput";
import { useInfiniteScroll } from "./useInfiniteScroll";
import { fetchPosts } from "../../../utils/fetchPosts";

function Content() {
  // 상태 관리
  const [posts, setPosts] = useState<PostType[]>([]);
  const [nextUrl, setNextUrl] = useState<string | null>(null);
  const [searchInputValue, setSearchInputValue] = useState('');

  // 파생 상태
  const isSearchMode = !!searchInputValue;

  // 무한 스크롤 처리
  const loadMore = useCallback(() => {
    if (nextUrl) {
      console.log('nextUrl Called');
      fetchPosts({ appendUrl: nextUrl, funcList: [setPosts, setNextUrl] });
    }
  }, [nextUrl]);

  const observerRef = useInfiniteScroll({
    fetchMore: loadMore,
    hasMore: !!nextUrl
  });

  // 초기 데이터 로드
  useEffect(() => {
    fetchPosts({requestParams: {searchValue: searchInputValue}, funcList: [setPosts, setNextUrl]});
  }, [searchInputValue]);

  // 검색 처리
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchInputValue(value);
  };

  return (
    <ContentContainer>
      <div className="recentPosterWrapper">
        <div className="topContainer">
          <span className="recentPostText">
            {searchInputValue ? `- 검색 결과 (${posts.length})` : '- 전체 게시글'}
          </span>
          <SearchInput value={searchInputValue} onChange={handleInputChange} />
        </div>
        <PostList
          isSearchMode={isSearchMode}
          posts={posts}
        />
        <div ref={observerRef} style={{ height: '10px' }} />
      </div>
    </ContentContainer>
  );
}

export default Content;
