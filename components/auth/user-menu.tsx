import { useState } from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu'
import { Button } from '../ui/button'
import { Avatar, AvatarFallback } from '../ui/avatar'
import { User } from 'better-auth'
import Link from 'next/link'
import { LogOut, PenSquare, UserIcon } from 'lucide-react'
import { toast } from 'sonner'
import { signOut } from '@/lib/auth-client'
import { useRouter } from 'next/navigation'

interface UserMenuProps {
  user: User
}

export default function UserMenu({ user }: UserMenuProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase()
  }

  const handleLogout = async () => {
    try {
      await signOut({
        fetchOptions: {
          onSuccess: () => {
            toast('Logged out successfully.')
            router.refresh()
          }
        }
      })
    } catch (error) {
      console.error(error)
      toast('Failed to log out. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={'ghost'} className='relative h-8 w-8 rounded-full'>
          <Avatar>
            <AvatarFallback>{getInitials(user?.name) || '?'}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end' className='w-56' >
        <div className='flex items-center justify-start gap-2 p-2'>
          <div className='flex flex-col space-y-1 leading-none'>
            <p className='font-medium'>{user?.name}</p>
            <p className='w-[200px] truncate text-sm text-muted-foreground'>{user?.email}</p>
          </div>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild className='cursor-pointer'>
          <Link href={'/profile'} >
            <UserIcon className='mr-2 h-4 w-4' />
            <span>Profile</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild className='cursor-pointer'>
          <Link href={'/post/create'} >
            <PenSquare className='mr-2 h-4 w-4' />
            <span>Create Post</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout} className='cursor-pointer'>
            <LogOut className='mr-2 h-4 w-4' />
            <span>{ isLoading ? 'Logging out...' : 'Logout' }</span>
        </DropdownMenuItem>

      </DropdownMenuContent>

    </DropdownMenu>
  )
}
