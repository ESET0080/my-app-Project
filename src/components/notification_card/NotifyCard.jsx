import React from 'react'
import { IoMdNotificationsOutline } from "react-icons/io";

export default function NotifyCard() {
    return (
        <div className='flex justify-between rounded-2xl border-black dark:border-gray-600 border-2 mb-10 h-20 bg-white dark:bg-gray-800'>
            <div className='justify-self-center bg-white dark:bg-gray-700 rounded-l-2xl w-[25%]  
                            overflow-hidden pt-5 pl-5'>
                <IoMdNotificationsOutline className="text-3xl text-gray-700 dark:text-blue-400" />
            </div>
            <div className='justify-self-center w-[75%] bg-gray-200 dark:bg-gray-800 rounded-r-2xl p-2'>
                <div className='font-bold mb-2 mt-2 text-gray-800 dark:text-white'>
                    Title of Notification
                </div>
                <div className='mb-2 mt-2 text-gray-600 dark:text-gray-300'>
                    Description of Notification
                </div>
            </div>
        </div>
    )
}