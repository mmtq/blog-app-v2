'use server'

import { auth } from "@/lib/auth"
import { db } from "@/lib/db"
import { posts } from "@/lib/db/schema"
import { slugify } from "@/lib/utils"
import { eq, ilike } from "drizzle-orm"
import { revalidatePath } from "next/cache"
import { headers } from "next/headers"

export async function createPost(formData: FormData) {
    try {
        // get the current user
        const session = await auth.api.getSession({
            headers: await headers(),
        })

        if (!session || !session.user) {
            return {
                success: false,
                message: 'You are not logged in'
            }
        }
        // get form data
        const title = formData.get('title') as string
        const description = formData.get('description') as string
        const content = formData.get('content') as string

        if (!title || !description || !content) {
            return {
                success: false,
                message: 'All fields are required'
            }
        }

        // create the slug
        const slug = slugify(title)

        // check if the slug already exists
        const existingPost = await db.query.posts.findFirst({
            where: eq(posts.slug, slug)
        })

        if (existingPost) {
            return {
                success: false,
                message: 'A post with this title already exists. Please choose a different title.'
            }
        }

        const [newPost] = await db.insert(posts).values({
            title,
            description,
            content,
            slug,
            authorId: session.user.id
        }).returning()

        //revalidate pages

        revalidatePath('/')
        revalidatePath(`/post/${slug}`)
        revalidatePath('/profile')

        return {
            success: true,
            message: 'Post created successfully',
            slug
        }
    } catch (error) {
        return {
            success: false,
            message: 'Failed to create post. Please try again.'
        }
    }
}


export async function updatePost(postID: number, formData: FormData) {
    try {
        const session = await auth.api.getSession({
            headers: await headers()
        })

        if (!session || !session.user) {
            return {
                success: false,
                message: 'You are not logged in'
            }
        }

        const existingPost = await db.query.posts.findFirst({
            where: eq(posts.id, postID)
        })

        if (existingPost?.authorId !== session.user.id) {
            return {
                success: false,
                message: 'You are not authorized to update this post'
            }
        }

        // get form data
        const title = formData.get('title') as string
        const description = formData.get('description') as string
        const content = formData.get('content') as string

        if (!title || !description || !content) {
            return {
                success: false,
                message: 'All fields are required'
            }
        }

        // update the post

        const [updatedPost] = await db.update(posts).set({
            title,
            description,
            content,
            updatedAt: new Date()
        }).where(eq(posts.id, postID)).returning()

        // revalidate pages
        revalidatePath('/')
        revalidatePath(`/post/${existingPost.slug}`)
        revalidatePath('/profile')

        return {
            success: true,
            message: 'Post updated successfully',
            slug: existingPost.slug
        }

    } catch (error) {
        console.error(error)
        return {
            success: false,
            message: 'Failed to update post. Please try again.'
        }
    }
}

export async function deletePost(postID: number) {
    try {
        const session = await auth.api.getSession({
            headers: await headers()
        })

        if (!session || !session.user) {
            return {
                success: false,
                message: 'You are not logged in'
            }
        }

        const existingPost = await db.query.posts.findFirst({
            where: eq(posts.id, postID)
        })

        if (existingPost?.authorId !== session.user.id) {
            return {
                success: false,
                message: 'You are not authorized to delete this post'
            }
        }

        const [deletedPost] = await db.delete(posts).where(eq(posts.id, postID)).returning()

        // revalidate pages
        revalidatePath('/')
        revalidatePath('/profile')

        return {
            success: true,
            message: 'Post deleted successfully',
        }

    } catch (error) {

    }
}

export async function searchPosts(query:string) {
    if (!query) return []

    try {
        const response = await db.select().from(posts).where(ilike(posts.title, `%${query}%`)).limit(10)
        return response
    } catch (error) {
        console.error(error)
        return []
    }
}