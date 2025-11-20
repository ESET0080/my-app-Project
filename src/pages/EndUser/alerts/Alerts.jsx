import React from 'react'
import NotifyCard from '../../../components/notification_card/NotifyCard'

export default function Alerts() {
    return (
        <div className='flex justify-between'>
            
            <div className='w-[30%] rounded-2xl bg-gray-200 dark:bg-gray-600 p-4 mr-2'>
                <NotifyCard/>
                <NotifyCard/>
                <NotifyCard/>
                <NotifyCard/>
                <NotifyCard/>
                <NotifyCard/>
                <NotifyCard/>
            </div>
            
            
            <div className='w-[70%] rounded-2xl bg-gray-200 dark:bg-gray-600 p-4 ml-2 text-gray-800 dark:text-white'>
                <div className='flex justify-between m-4'>
                    <div className='text-2xl font-bold dark:text-white'>
                        Title of Notification
                    </div>
                    <div className='dark:text-gray-300'>
                        <div className='m-2'>
                            05 May,2025
                        </div>
                        <div>
                            06:15 PM
                        </div>
                    </div>
                </div>
                <div className='dark:text-gray-300'>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. 
                    Odio voluptatibus quo quaerat quae perspiciatis pariatur sed laudantium 
                    voluptate ab sequi, quidem neque alias suscipit id voluptatem repellendus, 
                    natus corrupti hic.
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                    Laborum eum praesentium quia nostrum ad possimus est culpa neque natus nemo.
                    Iure saepe ducimus laborum vitae iste nihil molestias minima mollitia.
                </div>
            </div>
        </div>
    )
}