import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTrigger } from '@/components/ui/dialog';
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

export const ProjectDetails = () => {
    const dispatch = useDispatch();
    const {project}=useSelector(store=>store);
    const {id}=useParams();
    const handleProjectInvitation = () => {
        // Handle project invitation logic
    };
    useEffect(()=>{
        dispatch(fetchProjectById(id))
        console.log(project)
    },[id])

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
                                        {project.projectDetails?.team.map((item, index) => (
                                            <Avatar className="cursor-pointer" key={index}>
                                                <AvatarFallback>{item.fullName[0]}</AvatarFallback>
                                            </Avatar>
                                        ))}
                                    </div>
                                    <Dialog>
                                        <DialogTrigger>
                                            <DialogClose>
                                                <Button size="sm" variant="outline" onClick={handleProjectInvitation} className="ml-2">
                                                    <span>Invite</span>
                                                    <PlusIcon className="w-3 h-3" />
                                                </Button>
                                            </DialogClose>
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
                                <div className="flex">
                                    <p className="w-36">Status : </p>
                                    <Badge>{project.projectDetails?.status}</Badge>
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