import React from 'react'
import { CommentWrapper } from './Comment.style'
import { changeDateFormat } from '../../../../helpers/helper';
import { UserState } from '../../../../types/users.type';
import { CommentType } from '../../../../types/comments.type';

export default function Comment({ comment, user, handleDeleteComment }: { comment: CommentType, user?: UserState, handleDeleteComment: () => void }) {
  return (
    <CommentWrapper>
      <div className='comment-user'>
        <div className='comment-user-profile'>
          <img src={comment.user?.profileImage?.url || '/defaultAvatar.png'} alt="profile" />
        </div>
        <div className='comment-user-info'>
          <div className='comment-user-nickname'>
            {comment.user?.nickname}
          </div>
          <div className='comment-user-created-at'>
            {changeDateFormat(comment.createdAt, true)}
          </div>
        </div>
        {user?.id === comment.user?.id && <div className='comment-user-delete' onClick={handleDeleteComment}>삭제</div>}
      </div>
      <div className='comment-content'>
        <div className='comment-content-text'>
          {comment.content}
        </div>
      </div>
    </CommentWrapper>
  )
}