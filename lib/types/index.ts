import { InferSelectModel } from "drizzle-orm";
import { posts } from "../db/schema";

export type PostType = InferSelectModel<typeof posts>

export type PostTypeWithAuthorName = PostType & {
    author: {
        name: string
    }
}

export type PostListProps = {
    posts: PostTypeWithAuthorName[]
}

export type PostContentProps = {
    post: PostTypeWithAuthorName,
    isAuthor: boolean
}

export type DeletePostProps = {
    postID: number
}
