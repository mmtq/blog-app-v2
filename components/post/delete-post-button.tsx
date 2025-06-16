'use client'

import { DeletePostProps } from "@/lib/types"
import { Button } from "../ui/button"
import { Trash2 } from "lucide-react"

export default function DeletePostButton({postID} : DeletePostProps) {
  return (
    <>
    <Button variant={'destructive'} size={'sm'}>
      <Trash2 className="h-4 w-4" />
      Delete
    </Button>
    </>
  )
}
