'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import { Button } from '../ui/button';

const registerSchema = z.object({
    name: z.string().min(3, 'Name must be 3 characters long.'),
    email: z.string().email('Please enter a valid email address.'),
    password: z.string().min(6, 'Password must be at least 6 characters long.'),
    confirmPassword: z.string().min(6, 'Password must be at least 6 characters long.')
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ['confirmPassword']
})

type registerFormValues = z.infer<typeof registerSchema>

export default function RegisterForm() {
    const [isLoading, setIsLoading] = useState(false)
    const form = useForm<registerFormValues>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            name: '',
            email: '',
            password: '',
            confirmPassword: ''
        }
    })

    const onRegisterSubmit = async (values: registerFormValues) => {
        setIsLoading(true)
        console.log(values)
    }


    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onRegisterSubmit)} className='space-y-4'>
                <FormField
                    control={form.control}
                    name='name'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input type='text' placeholder='Enter your name' {...field} />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name='email'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input type='email' placeholder='Enter your email' {...field} />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name='password'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input type='password' placeholder='Enter your password' {...field} />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name='confirmPassword'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Confirm Password</FormLabel>
                            <FormControl>
                                <Input type='password' placeholder='Enter the password again' {...field} />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />

                <Button type='submit' className='w-full' disabled={isLoading}>
                    {
                        isLoading ? 'Creating Account' : 'Create Account'
                    }
                </Button>

            </form>
        </Form>
    )
}
