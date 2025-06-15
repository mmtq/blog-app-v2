'use server'

import { desc } from "drizzle-orm";
import { db } from ".";
import { posts } from "./schema";

export async function getAllPosts() {
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
    }
}