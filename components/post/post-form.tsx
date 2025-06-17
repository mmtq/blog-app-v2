'use client';

import { z } from "zod";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useTransition } from "react";
import { createPost, updatePost } from "@/actions/post-actions";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { EditPostProps, PostType } from "@/lib/types";

//post form schema

const postSchema = z.object({
    title: z.string().min(3, 'Title must be at least 3 characters long.').max(255, 'Title must be at most 255 characters long.').trim(),
    description: z.string().min(5, 'Description must be at least 3 characters long.').max(255, 'Description must be at most 255 characters long.').trim(),
    content: z.string().min(10, 'Content must be at least 3 characters long.')
})

type PostFormValues = z.infer<typeof postSchema>

export default function PostForm({ isEditing, post }: EditPostProps) {

    const router = useRouter()

    const [isPending, startTransition] = useTransition();

    const { register, handleSubmit, formState: { errors } } = useForm<PostFormValues>({
        resolver: zodResolver(postSchema),
        defaultValues: {
            title: post?.title ?? '',
            description: post?.description ?? '',
            content: post?.content ?? ''
        }
    })

    const onFormSubmit = (data: PostFormValues) => {
        startTransition(async () => {
            try {
                const formData = new FormData();
                formData.append('title', data.title);
                formData.append('description', data.description);
                formData.append('content', data.content);

                let response

                if (isEditing && post) {
                    response = await updatePost(post.id, formData)
                } else {
                    response = await createPost(formData);
                }

                console.log(response);

                if (response.success) {
                    toast.success(response.message)
                    router.push('/post/' + response.slug)
                }
                else {
                    toast.error(response.message)
                }
            } catch (error) {
                console.error(error);
            }
        })
    }
    return (
        <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
            <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input id="title" placeholder="Enter a title" {...register('title')} disabled={isPending} />
                {
                    errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>
                }
            </div>
            <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Input id="description" placeholder="Add a description" {...register('description')} disabled={isPending} />
                {
                    errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>
                }
            </div>
            <div className="space-y-2">
                <Label htmlFor="content">Content</Label>
                <Textarea id="content" placeholder="Add your content" {...register('content')} disabled={isPending} />
                {
                    errors.content && <p className="text-red-500 text-sm">{errors.content.message}</p>
                }
            </div>
            <Button className="w-full" type="submit" disabled={isPending}>
                {
                    isPending ? 'Saving Post...' :
                        isEditing ? 'Update Post' : 'Create Post'
                }
            </Button>
        </form>
    )
}
