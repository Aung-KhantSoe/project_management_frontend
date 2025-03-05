import React from 'react'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input';
import { DialogClose } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux';
import { register } from '@/Redux/Auth/Action';

export const Signup = () => {
    const dispatch = useDispatch();
    const form = useForm({
        defaultValues: {
            email: "",
            password: "",
            fullName: "",
        }
    });
    const onSubmit = (data) => {
        dispatch(register(data))
        console.log("create project data", data)
    }
    return (
        <div className='space-y-5'>
            <h1>Register</h1>
            <Form {...form}>
                <form className='space-y-5' onSubmit={form.handleSubmit(onSubmit)}>
                    <FormField control={form.control}
                        name="fullName"
                        render={({ field }) => <FormItem>
                            <FormControl>
                                <Input {...field} type="text" className="border w-full border-gray-700 py-5 px-5" placeholder="full name ..." ></Input>
                            </FormControl>
                            <FormMessage></FormMessage>
                        </FormItem>}>
                    </FormField>
                    <FormField control={form.control}
                        name="email"
                        render={({ field }) => <FormItem>
                            <FormControl>
                                <Input {...field} type="text" className="border w-full border-gray-700 py-5 px-5" placeholder="user email ..." ></Input>
                            </FormControl>
                            <FormMessage></FormMessage>
                        </FormItem>}>
                    </FormField>
                    <FormField control={form.control}
                        name="password"
                        render={({ field }) => <FormItem>
                            <FormControl>
                                <Input {...field} type="text" className="border w-full border-gray-700 py-5 px-5" placeholder="password ..." ></Input>
                            </FormControl>
                            <FormMessage></FormMessage>
                        </FormItem>}>
                    </FormField>

                    <Button type="submit" className="w-full my-5">Register</Button>

                </form>
            </Form>
        </div>
    )
}
