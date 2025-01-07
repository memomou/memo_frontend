import { PostType } from '../../types/post'
import PostItem from './PostItem'
import PostListWrapper from './PostList.style'

export default function PostList({isSearchMode, posts}: {isSearchMode: boolean, posts: PostType[]}) {
  return (
    <PostListWrapper className="recentPosts">
    {posts.length === 0 ? ( isSearchMode ? (<div>검색 결과가 없습니다.</div>) : (<div>게시물이 없습니다.</div>)) : (<></>)}
    {(posts)?.map((post) => (
      <PostItem post={post} key={post.id} />
    ))}
  </PostListWrapper>
  )
}
