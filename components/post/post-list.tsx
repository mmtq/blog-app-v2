import { PostListProps } from '@/lib/types/index'
import PostCard from './post-card'


export default function PostList({posts} : PostListProps) {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-10'>
      {
        posts.map((post) => (
          <PostCard key={post.id} post = {post} />
        ))
      }
    </div>
  )
}
