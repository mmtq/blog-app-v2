"use client"

import Link from "next/link"
import { ModeToggle } from "../theme/mode-toggle"
import { cn } from "@/lib/utils"
import { Button } from "../ui/button"
import { useSession } from "@/lib/auth-client"
import UserMenu from "../auth/user-menu"

export default function Header() {

  const { data: session, isPending } = useSession()

  const navItems = [
    {
      label: 'Home',
      href: '/'
    },
    {
      label: 'Create Post',
      href: '/post/create'
    }
  ]

  return (
    <header className="border-b bg-background sticky top-0 z-10">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href={'/'} className="font-bold text-xl">BlogMMTQ</Link>
          <nav className="hidden md:flex items-center gap-6">
            {
              navItems.map(item => (
                <Link key={item.href} href={item.href} className={cn("text-sm font-medium transition-colors hover:text-primary")} >{item.label}
                </Link>
              ))
            }
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden md:block">
            {/* Placeholer for search */}
          </div>
          <div className="flex items-center gap-2">
            <ModeToggle />
            {
              isPending ? null :
                session?.user ?
                  <UserMenu user={session?.user} /> :
                  <Button asChild variant={'outline'} className="cursor-pointer">
                    <Link href={'/auth'}>Login</Link>
                  </Button>
            }
          </div>
        </div>
      </div>
    </header>
  )
}
