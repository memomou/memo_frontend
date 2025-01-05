import { PostType } from '../../../../types/post'
import PostItem from './PostItem'

export default function PostList({isSearchedPostEmpty, posts}: {isSearchedPostEmpty: boolean, posts: PostType[]}) {
  return (
    <div className="recentPosts">
    {isSearchedPostEmpty ? (<div>검색 결과가 없습니다.</div>) : (<></>)}
    {(posts)?.map((post) => (
      <PostItem post={post} />
    ))}
  </div>
  )
}
