import { useEffect, useState } from "react";
import styled from "styled-components";
import { PostType } from "../../../types/post";
import { axiosInstance } from "../../../helpers/helper";
import {ContentContainer} from './Content.style';
import { Link } from "react-router-dom";

function Content() {
  const [posts, setPosts] = useState<PostType[]>([]);
  const [searchedPosts, setSearchedPosts] = useState<PostType[]>([]);
  const [searchInputValue, setSearchInputValue] = useState('');
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axiosInstance.get('/posts');
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
        where__content__i_like: e.target.value,
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
          <span className="recentPostText">- 최근 게시글</span>
          <span className="searchInputWrapper">
            <svg width="17" height="17" viewBox="0 0 17 17"><path fillRule="evenodd" d="M13.66 7.36a6.3 6.3 0 1 1-12.598 0 6.3 6.3 0 0 1 12.598 0zm-1.73 5.772a7.36 7.36 0 1 1 1.201-1.201l3.636 3.635c.31.31.31.815 0 1.126l-.075.075a.796.796 0 0 1-1.126 0l-3.636-3.635z" clipRule="evenodd" fill="currentColor"></path></svg>
            <input className="searchInput" type="text" placeholder="검색"       value={searchInputValue}
      onChange={handleInputChange} />
          </span>
        </div>
        <div className="recentPosts">
        {(searchedPosts.length > 0 ? searchedPosts : posts)?.map((post) => (
          <Link to={`/post/${post.id}`} key={post.id}>
            <div className="post" key={post.id}>
              <div className="title">
                <div>{post.title}</div>
              </div>
              <div className="content">
                <p>{post.content}</p>
              </div>
            </div>
          </Link>
        ))}
        </div>
      </div>
    </ContentContainer>
  );
}

export default Content;
