import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { auth } from '@/lib/auth'
import { PlusCircle } from 'lucide-react'
import { headers } from 'next/headers'
import Link from 'next/link'
import { redirect } from 'next/navigation'

export default async function Profile() {
  const session = await auth.api.getSession({
    headers : await headers()
  })

  if(!session || !session.user) {
    return redirect('/auth')
  }

  return (
    <main className='py-10'>
      <div className='max-w-7xl mx-auto px-4'>
        <div className='flex items-center justify-between mb-8'>
          <div>
            <h1 className='text-2xl font-bold'>My Profile</h1>
          </div>
          <Button asChild>
            <Link href={'/post/create'}>
              <PlusCircle className='h-5 w-5'/>
              Create Post
            </Link>
          </Button>
      </div>
      <Card className='mb-8'>
        <CardHeader>
          <CardTitle>Account Information</CardTitle>
          <CardDescription>Your Profile Info</CardDescription>
        </CardHeader>
        <CardContent>
          <div className='space-y-2'>
            <div>
              <span className='font-semibold'>Name:</span> {session?.user.name}
            </div>
            <div>
              <span className='font-semibold'>Email:</span> {session?.user.email}
            </div>
          </div>
        </CardContent>
      </Card>
      </div>
    </main>
  )
}
