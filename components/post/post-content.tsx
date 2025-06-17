import { PostContentProps } from "@/lib/types";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { formatDate } from "@/lib/utils";
import { Button } from "../ui/button";
import Link from "next/link";
import { Pencil } from "lucide-react";
import DeletePostButton from "./delete-post-button";

export default function PostContent({post, isAuthor} : PostContentProps) {

    const content = post.content.split('\n')

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">{post.title}</CardTitle>
        <CardDescription>
          By {post.author.name} - {formatDate(post.createdAt)}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground text-lg mb-6">{post.description}</p>
        <p className="mb-6">
            {
                content.map((line, index) => (
                    <span key={index}>
                        {line}
                        <br />
                    </span>
                ))
            }
        </p>
      </CardContent>
      {
        isAuthor && (
            <CardFooter >
                <div className="flex gap-2">
                    <Button asChild variant={'outline'} size={'sm'}>
                        <Link href={`/post/edit/${post.slug}`}>
                        <Pencil className="h-4 w-4" />
                        Edit
                        </Link>
                    </Button>
                    <DeletePostButton postID={post.id} />
                </div>
            </CardFooter>
        )
      }
    </Card>
  )
}
