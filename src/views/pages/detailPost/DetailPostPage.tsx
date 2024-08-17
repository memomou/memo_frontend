import DetailPosterForm from "./DetailPostPage.style";
import { Styled } from "../auth/authPage.style";
import { useParams } from "react-router-dom";
import { axiosInstance } from "../../../helpers/helper";
import { useEffect, useState } from "react";
import { PostType } from "../../../types/post";

function PosterPostPage(props: any) {
  const [post, setPost] = useState<PostType>();
  const {id: postId} = useParams();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axiosInstance.get(`/posts/${postId}`);
        console.log('Post:', response);
        const post = response.data.post as PostType;
        console.log('Post:', post);
        setPost(post);
      } catch (error) {
        console.error("Failed to fetch posts:", error);
      }
    };
    fetchPosts();
  }, []);

  console.log("params", postId);
  return (
    <Styled>
      <DetailPosterForm>
        <h1 className="title">{post?.title}</h1>
        <div className="content">
          <p>Detail Poster Content</p>
          <div dangerouslySetInnerHTML={{ __html: post?.content ?? "" }} />
        </div>
      </DetailPosterForm>
    </Styled>
  );
}

export default PosterPostPage;
