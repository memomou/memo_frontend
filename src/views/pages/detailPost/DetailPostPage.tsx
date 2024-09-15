import { PosterNewContainer, PageContainer } from "./DetailPostPage.style";
import DetailPosterForm from "./DetailPostPage.style";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { axiosInstance, changeDateFormat } from '../../../helpers/helper';
import { Link } from "react-router-dom";
import { PostType, userAtom, selectedCategoriesAtom } from "../../../components/atom/atoms";
import { useRecoilState } from "recoil";
import { SideBar } from "../../../components/SideBar/SideBar";

function DetailPostPage(props: any) {
  const [post, setPost] = useState<PostType>();
  const { id: postId } = useParams();
  const [user] = useRecoilState(userAtom);
  const [, setSelectedCategory] = useRecoilState(selectedCategoriesAtom);
  const navigate = useNavigate();
  const isOwnerOrAdmin = user?.id === post?.author?.id || user?.role === 'admin';

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axiosInstance.get(`/posts/${postId}`);
        const fetchedPost = response.data.post as PostType;
        console.log('Post:', fetchedPost);
        setPost(fetchedPost);
        setSelectedCategory(fetchedPost.category);
      } catch (error) {
        console.error("Failed to fetch post:", error);
      }
    };
    fetchPost();
  }, [postId, setSelectedCategory]);

  const handleDelete = async () => {
    if (window.confirm('정말로 이 게시글을 삭제하시겠습니까?')) {
      try {
        const response = await axiosInstance.delete(`/posts/${postId}`);
        console.log('Post Deleted:', response);
        navigate(-1); // 이전 페이지로 이동
      } catch (error) {
        console.error("Failed to delete post:", error);
      }
    }
  }
  return (
    <PageContainer>
      <SideBar showAddCategory={false} />
      <PosterNewContainer>
        <div className="options-bar">
          <div className="category-tag">
            {post?.category?.categoryName ?? "전체 게시글"}
          </div>
        </div>
        <div className="editor-container">
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
        </div>
      </PosterNewContainer>
    </PageContainer>
  );
}

export default DetailPostPage;
