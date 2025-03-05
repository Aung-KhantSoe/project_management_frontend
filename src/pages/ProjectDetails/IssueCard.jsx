import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { DotsVerticalIcon, PersonIcon } from '@radix-ui/react-icons';
import React from 'react';
import { UserList } from './UserList';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { deleteIssue, fetchIssues, updateIssueStatus } from '@/Redux/Issue/Action';

const IssueCard = ({ item, projectID }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleIssueDelete = async () => {
        try {
            await dispatch(deleteIssue(item.id)); // Delete the issue
            dispatch(fetchIssues(projectID)); // Refresh the issue list
        } catch (error) {
            console.error('Failed to delete issue:', error);
        }
    };

    const handleUpdateIssueStatus = async (status) => {
        await dispatch(updateIssueStatus({ id: item.id, status }));
        console.log(status);
    };

    return (
        <Card className="rounded-md shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="p-4 border-b">
                <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-4">
                        <CardTitle
                            className="cursor-pointer text-lg font-semibold"
                            onClick={() => navigate(`/project/${projectID}/issue/${item.id}`)}
                        >
                            #{item.id}
                        </CardTitle>
                        <CardTitle
                            className="cursor-pointer text-lg font-semibold"
                            onClick={() => navigate(`/project/${projectID}/issue/${item.id}`)}
                        >
                            {item.title}
                        </CardTitle>
                    </div>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button className="rounded-full" size="icon" variant="ghost">
                                <DotsVerticalIcon className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            {item.status !== 'pending' && (
                                <DropdownMenuItem onClick={() => handleUpdateIssueStatus('pending')}>
                                    To Do
                                </DropdownMenuItem>
                            )}
                            {item.status !== 'in_progress' && (
                                <DropdownMenuItem onClick={() => handleUpdateIssueStatus('in_progress')}>
                                    In Progress
                                </DropdownMenuItem>
                            )}
                            {item.status !== 'done' && (
                                <DropdownMenuItem onClick={() => handleUpdateIssueStatus('done')}>
                                    Done
                                </DropdownMenuItem>
                            )}
                            <DropdownMenuItem>Edit</DropdownMenuItem>
                            <DropdownMenuItem onClick={handleIssueDelete}>Delete</DropdownMenuItem>
                        </DropdownMenuContent>

                    </DropdownMenu>
                </div>
            </CardHeader>
            <CardContent className="p-4">
                <div className="flex items-center justify-between mb-4">
                    <p className="text-sm text-gray-600">{item.description}</p>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button size="icon" className="bg-gray-900 hover:bg-gray-800 text-white rounded-full">
                                <Avatar>
                                    <AvatarFallback>
                                        <PersonIcon className="h-4 w-4" />
                                    </AvatarFallback>
                                </Avatar>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-96">
                            <UserList issueDetails={item} />
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
                <div className="text-sm text-gray-500">
                    <p>Duration: {item.estimatedTime} hours</p>
                    {item.dependencies[0] && (
                        <p>Do it after issue: #{item.dependencies[0]}</p>
                    )}
                </div>
            </CardContent>
        </Card>
    );
};

export default IssueCard;
