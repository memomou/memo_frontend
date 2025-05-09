import { PosterNewContainer, PageContainer, StyledSlateEditor } from "./DetailPostPage.style";
import DetailPosterForm from "./DetailPostPage.style";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { axiosInstance, changeDateFormat } from '../../../helpers/helper';
import { Link } from "react-router-dom";
import { userAtom, selectedCategoriesAtom } from "../../../components/atom/atoms";
import { useRecoilState } from "recoil";
import { SideBar } from "../../../components/SideBar/SideBar";
import { formatFileSize, formatDate } from '../../../utils/formatters';
import { StyledEditable } from "../newPost/posterPostPage.style";
import { linkDecorator } from "../../../components/SlateEditor/LinkPlugin";
import { defaultValue } from "../newPost/component/Editor";
import { createEditor } from "slate";
import { withReact } from "slate-react";
import { updateEditorContent } from "../newPost/PosterPostPage.fn";
import { PostType } from "../../../types/post";
import CommentSection from "./Comment/CommentSection";

function DetailPostPage(props: any) {
  const [post, setPost] = useState<PostType>();
  const { id: postId } = useParams();
  const [user] = useRecoilState(userAtom);
  const [, setSelectedCategory] = useRecoilState(selectedCategoriesAtom);
  const navigate = useNavigate();
  const [editor] = useState(() => withReact(createEditor()));
  const isOwnerOrAdmin = user?.id === post?.author?.id || user?.role === 'admin';

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axiosInstance.get(`/posts/${postId}`);
        const fetchedPost = response.data.post as PostType;
        console.log('Post:', fetchedPost);
        setPost(fetchedPost);
        setSelectedCategory(fetchedPost.category);
        updateEditorContent(editor, fetchedPost.contentSlate);
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
      <SideBar />
      <PosterNewContainer>
        <div className="options-bar">
          <div className="category-tag">
            {post?.category?.categoryName ?? "전체 게시글"}
          </div>
        </div>
          <DetailPosterForm>
            <div className="wrapperOne">
              <span className="title">{post?.title ?? "..."}</span>
              <span className="date">{post?.createdAt ? changeDateFormat(post.createdAt, true) : "..."}</span>
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
                    <span>삭제</span>
                  </button>
                </div>
              ) : (
                <></>
              )}
            </div>
            <StyledSlateEditor
              editor={editor}
              initialValue={post?.contentSlate ?? defaultValue}
              renderEditable={
                (editableProps) =>
                  <StyledEditable
                    {...editableProps}
                    readOnly={true}
                    decorate={linkDecorator}
                  />
              }
            />
            {/* 첨부 파일 섹션 */}
            {post?.postFiles && post.postFiles.length > 0 && (
              <div className="attachment-section">
                <h4>첨부 파일</h4>
                <div className="uploaded-files">
                  {post.postFiles.map((file) => (
                    <div key={file.id} className="file-item">
                      <a href={file.url} download={file.originalFilename} className="file-name">
                        {file.originalFilename}
                      </a>
                      <span className="file-info">
                        {formatFileSize(file.fileSize)} | {formatDate(file.createdAt)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </DetailPosterForm>
        {post && <CommentSection post={post} user={user} />}
      </PosterNewContainer>
    </PageContainer>
  );
}

export default DetailPostPage;
