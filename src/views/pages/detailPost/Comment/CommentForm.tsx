import React, { useState } from 'react'
import { UserState } from '../../../../types/users.type';
import { CommentFormWrapper } from './CommentForm.style';

export default function CommentForm({ user, onSubmit }: { user?: UserState, onSubmit: (content: string) => void }) {
  const [content, setContent] = useState('');

  const handleResizeHeight = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    e.target.style.height = 'auto';
    e.target.style.height = e.target.scrollHeight + 'px';
    setContent(e.target.value);
  };

  const handleSubmit = () => {
    if (content.trim() === '') return;
    onSubmit(content);
    setContent('');
  };

  return (
    <CommentFormWrapper>
      <textarea
        placeholder={user ? "댓글을 입력하세요" : "댓글을 작성하려면 로그인이 필요합니다"}
        onChange={handleResizeHeight}
        rows={1}
        disabled={!user}
        value={content}
      />
      <button disabled={!user} onClick={handleSubmit}>댓글 작성</button>
    </CommentFormWrapper>
  )
}
