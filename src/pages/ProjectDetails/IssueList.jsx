import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from '@/components/ui/dialog';
import IssueCard from './IssueCard';
import { Button } from '@/components/ui/button';
import { PlusIcon } from '@radix-ui/react-icons';
import { DialogTitle } from '@radix-ui/react-dialog';
import { CreateIssueForm } from './CreateIssueForm';
import { useDispatch, useSelector } from 'react-redux';
import { fetchIssues } from '@/Redux/Issue/Action';
import { useParams } from 'react-router-dom';

export const IssueList = ({ title, status }) => {
    const dispatch = useDispatch();
    const { issue } = useSelector((store) => store);
    const { id: projectId } = useParams();
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    useEffect(() => {
        dispatch(fetchIssues(projectId)); // Fetch issues for the current project
    }, [projectId, dispatch]);

    const handleCreateIssue = () => {
        setIsDialogOpen(false); // Close the dialog
        dispatch(fetchIssues(projectId)); // Refresh the issue list
    };

    return (
        <div>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <Card className="w-full md:w-[300px] lg:w-[310px]">
                    <CardHeader>
                        <CardTitle>{title}</CardTitle>
                    </CardHeader>
                    <CardContent className="px-2">
                        <div className="space-y-2">
                            {issue.issue
                                ?.filter((issue) => issue.status === status)
                                .map((item) => (
                                    <IssueCard item={item} projectID={projectId} key={item.id} />
                                ))}
                        </div>
                    </CardContent>
                    <CardFooter>
                        <DialogTrigger asChild>
                            <Button className="w-full flex items-center gap-2">
                                <PlusIcon />Create Issue
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Create New Issue</DialogTitle>
                                <CreateIssueForm status={status} onCreateIssue={handleCreateIssue} />
                            </DialogHeader>
                        </DialogContent>
                    </CardFooter>
                </Card>
            </Dialog>
        </div>
    );
};