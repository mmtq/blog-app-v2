'use server'

import { desc, InferSelectModel } from "drizzle-orm";
import { db } from ".";
import { posts } from "./schema";
import { PostTypeWithAuthorName } from "../types";


export async function getAllPosts() : Promise<PostTypeWithAuthorName[]> {
    try {
        const allPosts = await db.query.posts.findMany({
            orderBy: [desc(posts.createdAt)],
            with : {
                author: true
            }
        })
        return allPosts
    } catch (error) {
        console.error(error);
        return []
    }
}