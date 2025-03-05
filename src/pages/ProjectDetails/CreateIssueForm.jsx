import React from 'react';
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { DialogClose } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useDispatch } from 'react-redux';
import { createIssue } from '@/Redux/Issue/Action';
import { useParams } from 'react-router-dom';

export const CreateIssueForm = ({ status, onCreateIssue }) => {
    const { id: projectId } = useParams(); // Rename `id` to `projectId` for clarity
    const dispatch = useDispatch();
    const form = useForm({
        defaultValues: {
            issueName: '',
            description: '',
        },
    });

    const onSubmit = async (data) => {
        const issueData = {
            title: data.issueName,
            description: data.description,
            projectID: projectId,
            status: status,
        };

        try {
            await dispatch(createIssue(issueData)); // Dispatch the action and wait for it to complete
            form.reset(); // Reset the form fields
            onCreateIssue(); // Notify the parent component to close the dialog and refresh the issue list
        } catch (error) {
            console.error('Failed to create issue:', error);
        }
    };

    return (
        <div>
            <Form {...form}>
                <form className="space-y-5" onSubmit={form.handleSubmit(onSubmit)}>
                    <FormField
                        control={form.control}
                        name="issueName"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input
                                        {...field}
                                        type="text"
                                        className="border w-full border-gray-700 py-5 px-5"
                                        placeholder="Issue name..."
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input
                                        {...field}
                                        type="text"
                                        className="border w-full border-gray-700 py-5 px-5"
                                        placeholder="Description..."
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <DialogClose>
                        <Button type="submit" className="w-full my-5">
                            Create Issue
                        </Button>
                    </DialogClose>
                </form>
            </Form>
        </div>
    );
};