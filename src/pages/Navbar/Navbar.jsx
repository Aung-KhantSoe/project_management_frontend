import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from '@/components/ui/dialog'
import React from 'react'
import { CreateProjectForm } from '../Project/CreateProjectForm'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { PersonIcon } from '@radix-ui/react-icons'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { store } from '@/Redux/Store'
import { logout } from '@/Redux/Auth/Action'

export const Navbar = () => {
    const navigate = useNavigate();
    const {auth} = useSelector(store=>store)
    const dispatch = useDispatch();
    const handleLogout=()=>{
        dispatch(logout())
    }
    return (
        <div className='border-b py-4 px-5 flex items-center justify-between'>
            <div className='flex items-center gap-3'>
                <p onClick={()=>navigate("/")} className='cursor-pointer'>Project Management</p>
                <Dialog>
                    <DialogTrigger>
                        <Button >New Project</Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>Create New Project</DialogHeader>
                        <CreateProjectForm></CreateProjectForm>
                    </DialogContent>
                </Dialog>
                {/* <Button variant="ghost">Upgrade</Button> */}
            </div>
            <div className="flex items-center gap-2">
                <p>{auth.user?.fullName}</p>
                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <Button variant="outline" size="icon" className="rounded-full border-2 border-gray-500"> 
                            <PersonIcon></PersonIcon>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem onClick={()=>navigate('/upgrade_plan')}>Upgrade</DropdownMenuItem>
                        <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
    )
}
