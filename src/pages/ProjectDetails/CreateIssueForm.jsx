import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { DialogClose } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useDispatch, useSelector } from 'react-redux';
import { createIssue, fetchIssues } from '@/Redux/Issue/Action';
import { useParams } from 'react-router-dom';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon } from '@radix-ui/react-icons';
import { format } from 'date-fns';
import { Label } from '@/components/ui/label';

export const CreateIssueForm = ({ status, onCreateIssue }) => {
    const { id: projectId } = useParams();
    const dispatch = useDispatch();
    const { issue } = useSelector((store) => store);
    const [availableIssues, setAvailableIssues] = useState([]);

    useEffect(() => {
        dispatch(fetchIssues(projectId));
    }, [dispatch, projectId]);

    useEffect(() => {
        if (issue?.issue) {
            const filteredIssues = issue.issue.filter(
                (item) => item.status === 'pending' || item.status === 'in_progress'
            );
            setAvailableIssues(filteredIssues);
        }
    }, [issue]);

    const form = useForm({
        defaultValues: {
            title: '',
            description: '',
            priority: 'Medium',
            estimatedTime: 0,
            dependencies: [],
            dueDate: new Date(),
        },
    });

    const onSubmit = async (data) => {
        const issueData = {
            title: data.title,
            description: data.description,
            priority: data.priority,
            status: status,
            projectID: Number(projectId),
            estimatedTime: Number(data.estimatedTime),
            dependencies: data.dependencies
                ? String(data.dependencies).split(',').map((id) => parseInt(id.trim(), 10))
                : [], // Ensure IDs are numbers
            dueDate: format(data.dueDate, 'yyyy-MM-dd'),
        };

        try {
            await dispatch(createIssue(issueData));
            form.reset();
            onCreateIssue();
        } catch (error) {
            console.error('Failed to create issue:', error);
        }
    };

    return (
        <div >
            <Form {...form}>
                <form className="space-y-5" onSubmit={form.handleSubmit(onSubmit)}>
                    {/* Title */}
                    <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Title</FormLabel>
                                <FormControl>
                                    <Input {...field} type="text" placeholder="Enter issue title..." />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Description */}
                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Description</FormLabel>
                                <FormControl>
                                    <Input {...field} type="text" placeholder="Enter description..." />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Priority */}
                    <FormField
                        control={form.control}
                        name="priority"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Priority</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select priority" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="Low">Low</SelectItem>
                                        <SelectItem value="Medium">Medium</SelectItem>
                                        <SelectItem value="High">High</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Estimated Time */}
                    <FormField
                        control={form.control}
                        name="estimatedTime"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Estimated Time (hours)</FormLabel>
                                <FormControl>
                                    <Input {...field} type="number" placeholder="Enter estimated time..." />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Due Date */}
                    <FormField
                        control={form.control}
                        name="dueDate"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Due Date</FormLabel>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <FormControl>
                                            <Button variant="outline">
                                                {field.value ? format(field.value, 'yyyy-MM-dd') : 'Pick a due date'}
                                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                            </Button>
                                        </FormControl>
                                    </PopoverTrigger>
                                    <PopoverContent>
                                        <Calendar
                                            mode="single"
                                            selected={field.value}
                                            onSelect={field.onChange}
                                            disabled={(date) => date < new Date()}
                                        />
                                    </PopoverContent>
                                </Popover>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Dependencies (Multi-Select) */}
                    <FormField
                        control={form.control}
                        name="dependencies"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Dependencies</FormLabel>
                                <Select
                                    multiple
                                    onValueChange={(values) => field.onChange(values)}
                                    value={field.value}
                                >
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select dependencies" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {availableIssues.map((issue) => (
                                            <SelectItem key={issue.id} value={issue.id.toString()}>
                                                {issue.title}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Submit Button */}
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
