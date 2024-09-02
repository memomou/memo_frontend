import DetailPosterForm from "./DetailPostPage.style";
import { Styled } from "../auth/authPage.style";
import { Link, useNavigate, useParams } from "react-router-dom";
import { axiosInstance, changeDateFormat } from "../../../helpers/helper";
import { useEffect, useState } from "react";
import { PostType } from "../../../types/post";
import { useRecoilState } from "recoil";
import { userAtom } from "../../../components/atom/atoms";

function DetailPostPage(props: any) {
  const [post, setPost] = useState<PostType>();
  const {id: postId} = useParams();
  const [user] = useRecoilState(userAtom);
  const navigate = useNavigate();
  const isOwnerOrAdmin = user?.id === post?.author?.id || user?.role === 'admin';

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axiosInstance.get(`/posts/${postId}`);
        const post = response.data.post as PostType;
        console.log('Post:', post);
        setPost(post);
      } catch (error) {
        console.error("Failed to fetch posts:", error);
      }
    };
    fetchPosts();
  }, []);

  const handleDelete = async () => {
    try {
      const response = await axiosInstance.delete(`/posts/${postId}`);
      console.log('Post Deleted:', response);
      navigate('/');
    } catch (error) {
      console.error("Failed to delete post:", error);
    }
  }

  console.log("params", postId);
  return (
    <Styled>
      <DetailPosterForm>
        <div className="wrapperOne">
          <span className="title">{post?.title ?? "..."}</span>
          <span className="date">{post?.createdAt ? changeDateFormat(post.createdAt) : "..."}</span>
        </div>
        <div className="wrapperTwo">
          <div className="author">
            <span>작성자: {post?.author?.nickname ?? "..."}</span>
          </div>
        {isOwnerOrAdmin ? (
          <div className="modification">
            <Link to={`/post/write?postId=${postId}`}>수정</Link>
            <span> | </span>
            <button onClick={handleDelete}>
              <span>
                삭제
              </span>
              </button>
          </div>) : (<></>)
        }
        </div>
        <div className="content">
          <div dangerouslySetInnerHTML={{ __html: post?.content ?? "..." }} />
        </div>

      </DetailPosterForm>
    </Styled>
  );
}

export default DetailPostPage;
