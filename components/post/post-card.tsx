import { PostType, PostTypeWithAuthorName } from '@/lib/types'
import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import Link from 'next/link'
import { formatDate } from '@/lib/utils'

export default function PostCard({ post }: { post: PostTypeWithAuthorName }) {
    return (
        <Card className='h-full flex flex-col'>
            <CardHeader>
                <Link className='hover:underline' href={`/post/${post.slug}`}>
                    <CardTitle className='text-xl'>{post.title}</CardTitle>
                </Link>
                <CardDescription>
                    By {post.author.name} - {formatDate(post.createdAt)}
                </CardDescription>
            </CardHeader>
            <CardContent>
                <p className='text-muted-foreground line-clamp-2'>{post.description}</p>
            </CardContent>
        </Card>
    )
}
