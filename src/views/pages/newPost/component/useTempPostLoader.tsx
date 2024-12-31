import { useCallback } from 'react';
import { Editor } from 'slate';
import { useNavigate } from 'react-router-dom';
import { axiosInstance } from '../../../../helpers/helper';
import { PostStatus, PostType } from '../../../../types/post';
import { getSendPostData, handlePostSubmission, updateEditorContent } from '../PosterPostPage.fn';

export const useTempPostLoader = (editor: Editor) => {
  const loadTempPost = useCallback((tempPost: PostType['tempPost'], setPost: React.Dispatch<React.SetStateAction<PostType>>) => {
    if (tempPost) {
      setPost((prev) => ({ ...prev, title: tempPost.title }));
      updateEditorContent(editor, tempPost.contentSlate);
      console.log("Loaded temp post");
    }
  }, [editor]);

  const performTempPostToast = useCallback(async (postPromise: Promise<PostType>, setPost: React.Dispatch<React.SetStateAction<PostType>>) => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    const fetchedPost = await postPromise;

    if (!fetchedPost.tempPost) {
      return;
    }

    const userConfirmed = window.confirm("임시 저장된 게시글을 불러오시겠습니까?");
    if (!userConfirmed) {
      return;
    }

    loadTempPost(fetchedPost.tempPost, setPost);
  }, [loadTempPost]);

  return { performTempPostToast };
};

interface UseTempSaveProps {
  postStatus: PostStatus;
  post: PostType;
  editor: Editor;
  setPost: React.Dispatch<React.SetStateAction<PostType>>;
}

export const useTempSave = ({
  post,
  setPost,
  editor,
}: UseTempSaveProps) => {
  const navigate = useNavigate();

  const handleTempSave = useCallback(async (event: React.MouseEvent) => {
    event.preventDefault();
    // 아예 게시글이 없는 상태라면
    const isUpdated = post.id ? true : false;
    if (!isUpdated) {
      // 게시글을 임시 상태로 저장
      const newPost = await handlePostSubmission(post, editor, PostStatus.DRAFT);
      const { id: fetchedPostId } = newPost;
      setPost((prev) => ({ ...prev, statusId: PostStatus.DRAFT }));
      navigate(`/post/write?postId=${fetchedPostId}`);
    } else {
      // 게시글 상태가 published 가 아니었다면
      if (post.statusId !== PostStatus.PUBLISHED) {
        // 게시글 상태를 임시 상태로 저장
        await handlePostSubmission(post, editor, PostStatus.DRAFT);
        setPost((prev) => ({ ...prev, statusId: PostStatus.DRAFT }));
      } else {
        // 게시글 상태가 published 일 때
        // 게시글의 임시 게시글 테이블에 저장
        await axiosInstance.put(`/posts/${post.id}/temp`, getSendPostData(editor, post.title));
      }
    }
    alert('임시 저장되었습니다.');
  }, [post.statusId, getSendPostData, setPost, navigate]);

  return { handleTempSave };
};
