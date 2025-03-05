import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from '@/components/ui/dialog'
import React, { useEffect } from 'react'
import IssueCard from './IssueCard'
import { Button } from '@/components/ui/button'
import { PlusIcon } from '@radix-ui/react-icons'
import { DialogTitle } from '@radix-ui/react-dialog'
import { CreateIssueForm } from './CreateIssueForm'
import { useDispatch, useSelector } from 'react-redux'
import { fetchIssues } from '@/Redux/Issue/Action'
import { useParams } from 'react-router-dom'
import { store } from '@/Redux/Store'

export const IssueList = ({title,status}) => {
    const dispatch = useDispatch();
    const {issue} = useSelector(store=>store);
    const {id} = useParams();
    useEffect(()=>{
        dispatch(fetchIssues(id))
    },[id])
    return (
        <div>
            <Dialog>
                <Card className="w-full md:w-[300px] lg:w-[310px]">
                    <CardHeader>
                        <CardTitle>{title}</CardTitle>
                    </CardHeader>
                    <CardContent className="px-2">
                        <div className='space-y-2'>
                            {issue.issue?.filter((issue=>issue.status==status)).map((item)=><IssueCard item={item} projectID={id} key={item.id}></IssueCard>)}
                        </div>
                    </CardContent>
                    <CardFooter>
                        <DialogTrigger>
                            <Button className="w-full flex items-center gap-2"><PlusIcon></PlusIcon>Create Issue</Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Create New Issue</DialogTitle>
                                <CreateIssueForm status={status}></CreateIssueForm>
                            </DialogHeader>
                        </DialogContent>
                    </CardFooter>
                </Card>
            </Dialog>
        </div>
    )
}
