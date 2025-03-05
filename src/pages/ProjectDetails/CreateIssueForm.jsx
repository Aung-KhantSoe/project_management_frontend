import React from 'react';
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { DialogClose } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useDispatch } from 'react-redux';
import { createIssue } from '@/Redux/Issue/Action';
import { useParams } from 'react-router-dom';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon } from '@radix-ui/react-icons';
import { format } from 'date-fns';
import { Label } from '@/components/ui/label'; // Import the Label component

export const CreateIssueForm = ({ status, onCreateIssue }) => {
    const { id: projectId } = useParams(); // Rename `id` to `projectId` for clarity
    const dispatch = useDispatch();
    const form = useForm({
        defaultValues: {
            title: '',
            description: '',
            priority: 'Medium', // Default priority
            estimatedTime: 0,
            dependencies: [],
            dueDate: new Date(), // Default to today's date
        },
    });

    const onSubmit = async (data) => {
        const issueData = {
            title: data.title,
            description: data.description,
            priority: data.priority,
            status: status,
            projectID: Number(projectId), // Ensure it's a number
            estimatedTime: Number(data.estimatedTime), // Ensure it's an integer
            dependencies: data.dependencies
            ? data.dependencies.split(',').map((id) => parseInt(id.trim(), 10)) // Convert string to an array of numbers
            : [], // Ensure it's an array of numbers
            dueDate: format(data.dueDate, 'yyyy-MM-dd'), // Ensure correct date format
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
                    {/* Title */}
                    <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Title</FormLabel> {/* Add label */}
                                <FormControl>
                                    <Input
                                        {...field}
                                        type="text"
                                        className="border w-full border-gray-700 py-5 px-5"
                                        placeholder="Enter issue title..."
                                    />
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
                                <FormLabel>Description</FormLabel> {/* Add label */}
                                <FormControl>
                                    <Input
                                        {...field}
                                        type="text"
                                        className="border w-full border-gray-700 py-5 px-5"
                                        placeholder="Enter description..."
                                    />
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
                                <FormLabel>Priority</FormLabel> {/* Add label */}
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
                                <FormLabel>Estimated Time (hours)</FormLabel> {/* Add label */}
                                <FormControl>
                                    <Input
                                        {...field}
                                        type="number"
                                        className="border w-full border-gray-700 py-5 px-5"
                                        placeholder="Enter estimated time..."
                                    />
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
                                <FormLabel>Due Date</FormLabel> {/* Add label */}
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <FormControl>
                                            <Button
                                                variant="outline"
                                                className="w-full border-gray-700 py-5 px-5"
                                            >
                                                {field.value ? (
                                                    format(field.value, 'yyyy-MM-dd')
                                                ) : (
                                                    <span>Pick a due date</span>
                                                )}
                                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                            </Button>
                                        </FormControl>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0">
                                        <Calendar
                                            mode="single"
                                            selected={field.value}
                                            onSelect={field.onChange}
                                            disabled={(date) => date < new Date()} // Disable past dates
                                        />
                                    </PopoverContent>
                                </Popover>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Dependencies */}
                    <FormField
                        control={form.control}
                        name="dependencies"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Dependencies</FormLabel> {/* Add label */}
                                <FormControl>
                                    <Input
                                        {...field}
                                        type="text"
                                        className="border w-full border-gray-700 py-5 px-5"
                                        placeholder="Enter dependencies (comma-separated issue IDs)..."
                                    />
                                </FormControl>
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