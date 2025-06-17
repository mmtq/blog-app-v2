import Container from "@/components/layout/container"
import PostForm from "@/components/post/post-form"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { auth } from "@/lib/auth"
import { getPostBySlug } from "@/lib/db/queries"
import { headers } from "next/headers"
import { notFound, redirect } from "next/navigation"
import { id } from "zod/v4/locales"

export default async function EditPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const session = await auth.api.getSession({
    headers: await headers()
  })

  if (!session || !session.user) {
    return redirect('/')
  }

  const post = await getPostBySlug(slug)

  if (!post) {
    return notFound()
  }

  if (post.authorId !== session.user.id) {
    return redirect('/')
  }

  return (
    <main className="py-10">
      <div className="max-w-4xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold">
              Edit Post
            </CardTitle>
          </CardHeader>
          <CardContent>
            <PostForm isEditing={true} post={{
              id: post.id,
              title: post.title,
              description: post.description || '',
              content: post.content,
              slug: post.slug
            }
            }
            />
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
