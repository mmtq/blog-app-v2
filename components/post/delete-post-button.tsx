'use client'

import { DeletePostProps } from "@/lib/types"
import { Button } from "../ui/button"
import { Trash2 } from "lucide-react"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog"
import { useState } from "react"
import { deletePost } from "@/actions/post-actions"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

export default function DeletePostButton({ postID }: { postID: number }) {
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);

  const handleDelete = async () => {
    try {
      setIsPending(true)

      const response = await deletePost(postID);

      if (response?.success) {
        toast.success(response.message);
        router.push('/')
        return
      } else {
        toast.error(response?.message || 'Failed to delete the post.');
      }
    } catch (error) {
      console.error('Delete error:', error);
      toast.error('Something went wrong while deleting.');
    }
  }
  return (
    <Dialog >
      <DialogTrigger asChild>
        <Button variant="destructive" size="sm">
          <Trash2 className="h-4 w-4 mr-1" />
          Delete
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogTitle>Delete Post</DialogTitle>
        <DialogDescription>
          Are you sure you want to delete this post?
        </DialogDescription>
        <DialogFooter>
          <DialogClose asChild><Button variant="ghost">Cancel</Button></DialogClose>
          <Button onClick={handleDelete} disabled={isPending}  variant="destructive">
            {
              isPending ? 'Deleting...' : 'Yes, delete'
            }
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}