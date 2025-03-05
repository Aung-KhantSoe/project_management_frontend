import { Button } from '@/components/ui/button'
import { CheckCircledIcon } from '@radix-ui/react-icons'
import React from 'react'

export const SubscriptionCard = ({data}) => {
    return (
        <div className='rounded-xl bg-[#1b1b1b] bg-opacity-10 shadow-[#14173b] shadow-2xl card p-5 space-y-5 w-[18rem] transition-transform duration-300 hover:scale-110'>
            <p>{data.planName}</p>
            <p>
                <span className='text-xl font-semibold'>MMK {data.price}/</span>
                <span>{data.planType}</span>
            </p>
            {data.planType == 'ANNUALLY'&&<p className='text-green-500'>30% off</p>}
            <Button className='w-full'>
                {data.buttonName}
            </Button>
            {data.features.map((item)=><div key={item} className='flex items-center gap-2'>
                    <CheckCircledIcon></CheckCircledIcon>
                    <p>{item}</p>
                </div>
            )}
        </div>
    )
}
