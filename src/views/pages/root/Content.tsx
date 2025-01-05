import { useEffect, useState } from "react";
import { axiosInstance } from "../../../helpers/helper";
import {ContentContainer} from './Content.style';
import { PostType } from "../../../types/post";
import PostList from "./PostList/PostList";
import SearchInput from "./SearchInput";

function Content() {
  const [posts, setPosts] = useState<PostType[]>([]);
  const [searchedPosts, setSearchedPosts] = useState<PostType[]>([]);
  const [searchInputValue, setSearchInputValue] = useState('');
  const postToDisplay = searchInputValue ? searchedPosts : posts;
  const isSearchedPostEmpty = !!(searchInputValue && searchedPosts.length === 0);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axiosInstance.get('/posts', {
          params: {
            take: 20,
          },
        });
        console.log('Posts:', response);
        const posts = response.data.posts.data as PostType[];
        posts.map((post) => {
          post.content = post.content.replace(/<[^>]+>/g, '');
          return post;
        });
        setPosts(posts);
      } catch (error) {
        console.error("Failed to fetch posts:", error);
      }
    };
    fetchPosts();
  }, []);

  const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInputValue(e.target.value);
    console.log(e.target.value);
    if (!e.target.value) {
      setSearchedPosts([]);
      console.log('No search input');
      return;
    }
    const response = await axiosInstance.get('/posts', {
      params: {
        content_or_title_include: e.target.value,
        take: 20,
    }});

    const searchedPosts = response.data.posts.data as PostType[];
    searchedPosts.map((post) => {
      post.content = post.content.replace(/<[^>]+>/g, '');
      return post;
    });
    setSearchedPosts(searchedPosts);
    console.log('Posts:', response);
  }

  return (
    <ContentContainer>
      <div className="recentPosterWrapper">
        <div className="topContainer">
          <span className="recentPostText">{searchInputValue ? `- 검색 결과 (${searchedPosts.length})` : `- 전체 게시글`}</span>
          <SearchInput value={searchInputValue} onChange={handleInputChange} />
        </div>
        <PostList isSearchedPostEmpty={isSearchedPostEmpty} posts={postToDisplay} />
      </div>
    </ContentContainer>
  );
}

export default Content;
