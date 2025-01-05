import React from "react";
import { Link } from "react-router-dom";
import { changeDateFormat } from "../../../../helpers/helper";
import { PostType } from "../../../../types/post";

export default function PostItem({ post }: { post: PostType }) {
  return (
    <Link to={`/${post.author.nickname}/post/${post.id}`} key={post.id}>
      <div className="post" key={post.id}>
        <div className="top-wrapper">
          <div className="title">{post.title}</div>
        </div>
        <div className="content">
          <p>{post.content}</p>
        </div>
        <div className="bottom-wrapper">
          <div className="author">
            <img
              src={post.author.profileImage?.url || "/defaultAvatar.png"}
              alt={`${post.author.nickname}의 프로필`}
              className="profile-image"
            />
            {post.author.nickname}
          </div>
          <div className="date">{changeDateFormat(post.createdAt)}</div>
        </div>
      </div>
    </Link>
  );
}
