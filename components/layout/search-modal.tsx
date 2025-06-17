'use client'
import { DialogTrigger } from "@radix-ui/react-dialog";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogTitle } from "../ui/dialog";
import { Button } from "../ui/button";
import { Search } from "lucide-react";
import { Input } from "../ui/input";
import { useEffect, useState, useTransition } from "react";
import { useDebounce } from "@/hooks/use-debounce";
import { PostType } from "@/lib/types";
import { searchPosts } from "@/actions/post-actions";
import Link from "next/link";

export default function SearchModal() {
    const [query, setQuery] = useState('')
    const [isPending, startTransition] = useTransition();
    const [results, setResults] = useState<PostType[]>([])
    const debouncedQuery = useDebounce(query, 2000)

    useEffect(() => {
        if (!debouncedQuery) {
            setResults([])
        }

        startTransition(async () => {
            const response = await searchPosts(debouncedQuery)
            setResults(response)
        })

    }, [debouncedQuery])

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant={'ghost'}>
                    <Search className="h-4 w-4" />
                    Search
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-xl">
                <DialogTitle className="flex flex-row items-center justify-start"><Search className="mr-2 h-5 w-5" /> Search</DialogTitle>
                <DialogDescription>Type to search posts...</DialogDescription>
                <Input
                    placeholder="Search title..."
                    value={query}
                    onChange={(e) => (setQuery(e.target.value))}
                />
                <div className="mt-4 max-h-60 overflow-y-auto space-y-2">
                    {isPending ? (
                        <p className="text-muted-foreground text-sm">Searching...</p>
                    ) : results.length > 0 ? (
                        results.map((post) => (
                            <div key={post.id} className="border rounded p-2">
                                <DialogClose asChild>
                                    <Link href={`/post/${post.slug}`} passHref>
                                        <h3 className="text-md font-semibold">{post.title}</h3>
                                        <p className="text-muted-foreground text-sm">
                                            {post.description?.slice(0, 100)}...
                                        </p>
                                    </Link>
                                </DialogClose>
                            </div>
                        ))
                    ) : (
                        debouncedQuery && <p className="text-sm text-muted-foreground">No results found.</p>
                    )}
                </div>

            </DialogContent>
        </Dialog>
    )
}
