import React from 'react'
import { CommentsWrapper } from './CommentList.style';
import Comment from './Comment';
import { CommentType } from '../../../../types/comments.type';
import { UserState } from '../../../../types/users.type';

export default function CommentList({ comments, user, handleDeleteComment }: { comments: CommentType[], user?: UserState, handleDeleteComment: (commentId: string) => void }) {
  return (
    <CommentsWrapper>
      {comments.map((comment) => (
        <Comment key={comment.id} comment={comment} user={user} handleDeleteComment={() => handleDeleteComment(comment.id)} />
      ))}
    </CommentsWrapper>
  )
}
