import React from 'react'
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input';
import { DialogClose } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useDispatch } from 'react-redux';
import { createIssue } from '@/Redux/Issue/Action';
import { useParams } from 'react-router-dom';

export const CreateIssueForm = ({status}) => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const form = useForm({
        defaultValues: {
            issueName: "",
            description: "",
        }
    });
    const onSubmit = (data) => {
        data.projectID = id;
        dispatch(createIssue({
            title: data.issueName,
            description: data.description,
            projectID: id,
            status: status,
        }));
        console.log("create issue data", data)
    }
    return (
        <div>
            <Form {...form}>
                <form className='space-y-5' onSubmit={form.handleSubmit(onSubmit)}>
                    <FormField control={form.control}
                        name="issueName"
                        render={({ field }) => <FormItem>
                            <FormControl>
                                <Input {...field} type="text" className="border w-full border-gray-700 py-5 px-5" placeholder="issue name ..." ></Input>
                            </FormControl>
                            <FormMessage></FormMessage>
                        </FormItem>}>
                    </FormField>
                    <FormField control={form.control}
                        name="description"
                        render={({ field }) => <FormItem>
                            <FormControl>
                                <Input {...field} type="text" className="border w-full border-gray-700 py-5 px-5" placeholder="description ..." ></Input>
                            </FormControl>
                            <FormMessage></FormMessage>
                        </FormItem>}>
                    </FormField>
                    <DialogClose>
                        <Button type="submit" className="w-full my-5">Create issue</Button>
                    </DialogClose>
                </form>
            </Form>
        </div>
    )
}
