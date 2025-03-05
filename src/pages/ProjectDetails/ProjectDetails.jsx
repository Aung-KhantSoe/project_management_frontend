import { Button } from '@/components/ui/button'; // Import shadcn Button
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogTitle, DialogClose, DialogContent, DialogHeader, DialogTrigger } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { PlusIcon } from '@radix-ui/react-icons';
import React, { useEffect } from 'react';
import { InviteUserForm } from './InviteUserForm';
import { IssueList } from './IssueList';
import { ChatBox } from './ChatBox';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProjectById } from '@/Redux/Project/Action';
import { useParams } from 'react-router-dom';
import { store } from '@/Redux/Store';
import { fetchCPMIssues, fetchIssues } from '@/Redux/Issue/Action';

export const ProjectDetails = () => {
    const dispatch = useDispatch();
    const { project, issue } = useSelector(store => store);
    const { id } = useParams();

    const handleProjectInvitation = () => {
        // Handle project invitation logic
    };

    useEffect(() => {
        dispatch(fetchProjectById(id));
        dispatch(fetchCPMIssues(id));
        dispatch(fetchIssues(id));
    }, [id]);

    // Function to get issue details by ID
    const getIssueDetailsById = (issueId) => {
        return issue.issues?.find((issue) => issue.id === issueId);
    };

    return (
        <>
            <div className="flex mt-5 lg:px-10">
                <div className="lg:flex gap-5 justify-between pb-4">
                    {/* Scrollable Area for Project Details and Issue Lists */}
                    <ScrollArea className="h-screen pr-2">
                        <div className="text-gray-600 pb-10 w-full">
                            <h1 className="text-lg font-semibold pb-5">{project.projectDetails?.name}</h1>
                            <div className="space-y-5 pb-10">
                                <p className="w-full md:max-w-lg lg:max-w-xl text-sm">
                                    {project.projectDetails?.description}
                                </p>
                                <div className="flex">
                                    <p className="w-36">Project Lead : </p>
                                    <p>{project.projectDetails?.owner.fullName}</p>
                                </div>
                                <div className="flex">
                                    <p className="w-36">Members : </p>
                                    <div className="flex items-center gap-3">
                                        {project.projectDetails?.team?.map((item, index) => (
                                            <Avatar className="cursor-pointer" key={index}>
                                                <AvatarFallback>{item.fullName[0]}</AvatarFallback>
                                            </Avatar>
                                        ))}
                                    </div>
                                    <Dialog>
                                        <DialogTrigger>
                                            <Button size="sm" variant="outline" onClick={handleProjectInvitation} className="ml-2">
                                                <span>Invite</span>
                                                <PlusIcon className="w-3 h-3" />
                                            </Button>
                                        </DialogTrigger>
                                        <DialogContent>
                                            <DialogHeader>Invite User</DialogHeader>
                                            <InviteUserForm />
                                        </DialogContent>
                                    </Dialog>
                                </div>
                                <div className="flex">
                                    <p className="w-36">Category : </p>
                                    <p>{project.projectDetails?.category}</p>
                                </div>
                                <div className="flex p-y-3">
                                    {/* CPM Button with Dialog */}
                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <Button>CPM</Button>
                                        </DialogTrigger>
                                        <DialogContent>
                                            <DialogHeader>
                                                <DialogTitle>Critical Path (CPM)</DialogTitle>
                                            </DialogHeader>
                                            {issue.loading ? (
                                                <p>Loading CPM issues...</p>
                                            ) : issue.error ? (
                                                <p className="text-red-500">Error: {issue.error}</p>
                                            ) : issue.cpm_issues ? (
                                                <div>
                                                    <p><strong>Total Duration:</strong> {issue.cpm_issues.totalDuration} hours</p>
                                                    {/* <h3 className="text-md font-semibold mt-3">Critical Path:</h3> */}
                                                    {/* <ul>
                                                        {issue.cpm_issues?.criticalPath?.map((issueId, index) => {
                                                            const issueDetails = getIssueDetailsById(issueId);
                                                            return (
                                                                <li key={index} className="mt-2">
                                                                    {issueDetails ? (
                                                                        <div>
                                                                            <strong>{issueDetails.title}</strong> - {issueDetails.description} (Duration: {issueDetails.estimatedTime})
                                                                        </div>
                                                                    ) : (
                                                                        <div>
                                                                            <strong>Issue ID:</strong> {issueId}
                                                                        </div>
                                                                    )}
                                                                </li>
                                                            );
                                                        })}
                                                    </ul> */}
                                                    <ol className="items-center sm:flex mt-6 mb-6">
                                                        {issue.cpm_issues?.criticalPath?.map((issueId, index) => {
                                                            const issueDetails = getIssueDetailsById(issueId);
                                                            return (
                                                                <li key={index} className="relative mb-6 sm:mb-0">
                                                                    {issueDetails ? (

                                                                        <div>
                                                                            <div class="flex items-center">
                                                                                <div class="z-10 flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full ring-0 ring-white dark:bg-blue-900 sm:ring-8 dark:ring-gray-900 shrink-0">
                                                                                    <svg class="w-2.5 h-2.5 text-blue-800 dark:text-blue-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                                                                        <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                                                                                    </svg>
                                                                                </div>
                                                                                <div class="hidden sm:flex w-full bg-gray-200 h-0.5 dark:bg-gray-700"></div>
                                                                            </div>
                                                                            <div class="mt-3 sm:pe-8">
                                                                                <h3 class="text-lg font-semibold text-gray-900 dark:text-white">{issueId}</h3>
                                                                                <time class="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">{issueDetails.estimatedTime}</time>
                                                                                <p class="text-base font-normal text-gray-500 dark:text-gray-400">{issueDetails.description}</p>
                                                                            </div>
                                                                            <strong>{issueDetails.title}</strong> - {issueDetails.description} (Duration: {issueDetails.estimatedTime})
                                                                        </div>
                                                                    ) : (
                                                                        <div>
                                                                            <div class="flex items-center">
                                                                                <div className="z-10 flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full ring-0 ring-white dark:bg-blue-900 sm:ring-8 dark:ring-gray-900 shrink-0">
                                                
                                                                                    <Avatar>
                                                                                        <AvatarFallback>{index+1}</AvatarFallback>
                                                                                    </Avatar>
                                                                                </div>
                                                                                <div class="hidden sm:flex w-full bg-gray-800 h-0.5 dark:bg-gray-700"></div>
                                                                            </div>
                                                                            <div class="mt-3 sm:pe-8">
                                                                                <h3 class="text-sm font-semibold text-gray-900 dark:text-white">Issue ID: {issueId}</h3>
                                                                                {/* <time class="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">{issueDetails.estimatedTime}</time> */}
                                                                                {/* <p class="text-base font-normal text-gray-500 dark:text-gray-400">{issueDetails.description}</p> */}
                                                                            </div>
                                                                        </div>
                                                                    )}
                                                                </li>
                                                            );
                                                        })}
                                                    </ol>
                                                    {issue.cpm_issues?.remainingIssues > 0 ?
                                                        <div>
                                                            <h3 className="text-md font-semibold mt-3">Remaining Issues :</h3>
                                                            <ul>
                                                                {issue.cpm_issues?.remainingIssues?.map((issueId, index) => {
                                                                    const issueDetails = getIssueDetailsById(issueId);
                                                                    return (
                                                                        <li key={index} className="mt-2">
                                                                            {issueDetails ? (
                                                                                <div>
                                                                                    <strong>{issueDetails.title}</strong> - {issueDetails.description} (Duration: {issueDetails.estimatedTime})
                                                                                </div>
                                                                            ) : (
                                                                                <div>
                                                                                    <strong>Issue ID:</strong> {issueId}
                                                                                </div>
                                                                            )}
                                                                        </li>
                                                                    );
                                                                })}
                                                            </ul>
                                                        </div>
                                                        : <div></div>}
                                                </div>
                                            ) : (
                                                <p>No critical path data available.</p>
                                            )}
                                        </DialogContent>
                                    </Dialog>
                                </div>
                            </div>
                            <section>
                                <p className='py-5 border-b text-lg tracking-wider'>Tasks</p>
                                {/* Make this section horizontally scrollable */}
                                <div className='overflow-x-auto whitespace-nowrap py-5'>
                                    <div className='flex gap-3'>
                                        <IssueList status="pending" title="Todo List" />
                                        <IssueList status="in_progress" title="In progress" />
                                        <IssueList status="done" title="Done" />
                                    </div>
                                </div>
                            </section>
                        </div>
                    </ScrollArea>

                    {/* ChatBox */}
                </div>
                <div className="lg:w-full rounded-md sticky top-0 h-screen">
                    <ChatBox />
                </div>
            </div>
        </>
    );
};