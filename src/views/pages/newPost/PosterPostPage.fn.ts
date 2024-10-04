import { PostStatus, PostType } from "../../../components/atom/atoms";

import { Editor, Transforms } from "slate";
import { axiosInstance } from "../../../helpers/helper";
import { serialize } from "../../../components/SlateEditor/serialize";
import { useLocation, useNavigate } from "react-router-dom";
import { useCallback, useEffect, useRef } from "react";
import { CustomElement } from "../../../types/slate";

export const handlePostSubmission = async (post: PostType, editor: Editor, statusId: PostStatus) => {
  try {
    const postData = {
      ...getSendPostData(editor, post.title),
      categoryId: post.category ? post.category.id : null,
      visibilityId: post.visibilityId,
      statusId,
    };

    const isUpdate = post.id ? true : false;
    const response = isUpdate
      ? await axiosInstance.patch(`/posts/${post.id}`, postData)
      : await axiosInstance.post('/posts', postData);

    const updatedPost = response.data.post as PostType;
    if (!updatedPost) {
      throw new Error('Post not found');
    }
    return updatedPost;
  } catch (error) {
    console.error('게시글 저장 실패:', error);
    throw error;
  }
};

export const getSendPostData = (editor: Editor, title: string) => {
  const jsonContent = JSON.stringify(editor.children);
  const deserializedContent = serialize(editor);
  return {
    title,
    content: deserializedContent,
    contentSlate: jsonContent,
  }
}

export const useNavigationHistory = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const historyRef = useRef<string[]>([]);

  useEffect(() => {
    historyRef.current.push(location.search);
    if (historyRef.current.length >= 3) {
      historyRef.current.shift();
    }
  }, [location]);

  const goBack = useCallback((event: React.MouseEvent) => {
    event.preventDefault();
    const currentHistory = historyRef.current;
    if (currentHistory.length >= 2 && currentHistory[0] !== currentHistory[1]) {
      navigate(-2);
    } else {
      navigate(-1);
    }
    // 현재 경로를 히스토리에서 제거
    historyRef.current = currentHistory.slice(0, -1);
  }, [navigate]);

  return { goBack };
};


export const updateEditorContent = (editor: Editor, content: CustomElement[]) => {
  Transforms.deselect(editor);
  editor.children = content;
  editor.onChange();
};


export const usePublishPost = () => {
  const navigate = useNavigate();
  const publishPost = async (post: PostType, editor: Editor) => {
    const UpdatedPost = await handlePostSubmission(post, editor, PostStatus.PUBLISHED);
    const {id: UpdatedPostId} = UpdatedPost;
    navigate(`/${UpdatedPost.author.nickname}/post/${UpdatedPostId}`);
  };
  return { publishPost };
};
