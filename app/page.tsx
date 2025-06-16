import PostList from "@/components/post/post-list";
import { getAllPosts } from "@/lib/db/queries";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "BlogMMTQ v2",
  description: "NextJS-15 Blog App using zustand, drizzle, and postgres ",
}

export default async function Home() {

  const posts = await getAllPosts();

  return (
    <main className="py-10">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-2xl font-bold mb-2">Welcome to the Blog</h1>
        {
          posts?.length > 0 ? (
            <div className="mt-4">
              <PostList posts={posts} />
            </div>
          ) : (
            <div className="text-center py-10">
              <h2 className="text-xl font-medium">No posts found</h2>
            </div>
          )
        }
      </div>
    </main>
  );
}
