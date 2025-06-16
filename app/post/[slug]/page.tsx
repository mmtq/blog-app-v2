import PostContent from "@/components/post/post-content"
import { auth } from "@/lib/auth"
import { getPostBySlug } from "@/lib/db/queries"
import { headers } from "next/headers"
import { notFound } from "next/navigation"

export default async function PostDetails({params} : { params : Promise<{slug:string}>}) {
  const {slug} = await params
  const post = await getPostBySlug(slug)

  if (!post) {
    notFound()
  }
  //get user session
  const session = await auth.api.getSession({
    headers : await headers()
  })

  const isAuthor = post.authorId === session?.user?.id

  return (
    <main className="py-10">
      <div className="max-w-4xl mx-auto">
        <PostContent post={post} isAuthor={isAuthor} />
      </div>
    </main>
  )
}
