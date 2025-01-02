import React, { useState } from 'react';
import { CommentSectionWrapper } from './CommentSection.style';
import CommentForm from './CommentForm';
import CommentList from './CommentList';
import { addComment, deleteComment } from './api';
import { CommentType } from '../../../../types/comments.type';
import { UserState } from '../../../../types/users.type';
import { PostType } from '../../../../types/post';

const CommentsSection = ({ user, post }: { user?: UserState, post: PostType }) => {
  const [comments, setComments] = useState<CommentType[]>(post.comments);

  const handleAddComment = async (content: string) => {
    try {
      const newComment = await addComment({ postId: post.id, content });
      setComments(prev => [...prev, {...newComment, user: user}]);
    } catch (error) {
      console.error('댓글 추가 실패:', error);
    }
  };

  const handleDeleteComment = async (commentId: string) => {
    try {
      await deleteComment({ postId: post.id, commentId });
      setComments(prev => prev.filter(comment => comment.id !== commentId));
    } catch (error) {
      console.error('댓글 삭제 실패:', error);
    }
  };

  return (
    <CommentSectionWrapper>
      <CommentForm
        user={user}
        onSubmit={handleAddComment}
      />
      <CommentList comments={comments} user={user} handleDeleteComment={handleDeleteComment} />
    </CommentSectionWrapper>
  );
};

export default CommentsSection;
