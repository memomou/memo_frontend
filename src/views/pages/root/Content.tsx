import { useEffect, useState } from "react";
import styled from "styled-components";
import { PostType } from "../../../types/post";
import { axiosInstance } from "../../../helpers/helper";
import {ContentContainer} from './Content.style';
import { Link } from "react-router-dom";

function Content() {
  const [posts, setPosts] = useState<PostType[]>([]);
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
  return (
    <ContentContainer>
      <div className="recentPosterWrapper">
        <div className="recentPosterTitle">
          <h1>- 최근 게시글</h1>
        </div>
        <div className="recentPosts">
          {posts.length && posts.map((post) => (
            <Link to={`/post/${post.id}`}>
              <div className="post" key={post.id}>
                <h4>{post.title}</h4>
                <p>{post.content}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </ContentContainer>
  );
}

export default Content;
