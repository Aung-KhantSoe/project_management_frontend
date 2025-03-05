import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { fetchChatByProject, fetchChatMessages, sendMessage } from '@/Redux/Chat/Action'
import { store } from '@/Redux/Store'
import { PaperPlaneIcon } from '@radix-ui/react-icons'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

export const ChatBox = () => {
    const [message, setMessage] = useState("");
    const { auth, chat } = useSelector(store => store);
    const { id } = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchChatByProject(id));
    }, []);
    useEffect(() => {
        if (id) {  // Only fetch messages when chat ID is available
            dispatch(fetchChatMessages(id));
        }
    }, [id]);  // Depend on `chat.chat` to trigger the effect when it updates

    // const handleSendMessage = () => {
    //     dispatch(sendMessage({
    //         senderId: auth.user?.id,
    //         projectId: id,
    //         content: message
    //     }))
    //     setMessage('');
    //     console.log("message ", message)
    // }
    const handleMessageChange = (e) => {
        setMessage(e.target.value);
    }
    const handleSendMessage = async () => {
        await dispatch(sendMessage({
            senderId: auth.user?.id,
            projectId: id,
            content: message
        }));
        setMessage('');
        dispatch(fetchChatMessages(id)); // Re-fetch messages after sending
    };

    return (
        <div className='sticky'>
            <div className='border rounded-lg'>
                <h1 className='border-b p-5'>Chat Box</h1>
                <ScrollArea className='h-[32rem] w-full p-5 flex gap-3 flex-col'>
                    {chat.messages?.map((item, index) => (
                        item?.sender ? (
                            item.sender.id !== auth.user.id ?
                                <div key={index} className='flex gap-2 mb-2 justify-start'>
                                    <Avatar>
                                        <AvatarFallback>{item.sender.fullName?.[0] || "?"}</AvatarFallback>
                                    </Avatar>
                                    <div className='space-y-2 py-2 px-5 border rounded-ss-2xl rounded-e-xl'>
                                        <p>{item.sender.fullName || "Unknown User"}</p>
                                        <p className='text-gray-300'>{item.content}</p>
                                    </div>
                                </div> :
                                <div key={index} className='flex gap-2 mb-2  justify-end'>
                                    <div className='space-y-2 py-2 px-5 border rounded-se-2xl rounded-s-xl'>
                                        <p>{item.sender.fullName || "Unknown User"}</p>
                                        <p className='text-gray-300'>{item.content}</p>
                                    </div>
                                    <Avatar>
                                        <AvatarFallback>{item.sender.fullName?.[0] || "?"}</AvatarFallback>
                                    </Avatar>
                                </div>
                        ) : null
                    ))}

                </ScrollArea>
                <div className='relative p-0'>
                    <Input
                        placeHolder="type message..."
                        className="py-7 border-t outline-none focus:outline-none focus:ring-0 rounded-none border-b-0 border-x-0"
                        value={message} onChange={handleMessageChange}></Input>
                    <Button onClick={handleSendMessage} className="absolute right-2 top-3 rounded-full" size="icon" variant="ghost">
                        <PaperPlaneIcon></PaperPlaneIcon>
                    </Button>
                </div>
            </div>
        </div>
    )
}
