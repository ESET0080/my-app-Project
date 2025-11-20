import React from 'react'
import { FiAlertTriangle } from "react-icons/fi";

export default function AlertCard() {
    return (
        <div className='flex justify-between rounded-lg border-red-500 dark:border-red-400 border-2 mb-2 h-14 bg-white dark:bg-gray-800 hover:bg-red-50 dark:hover:bg-gray-700 cursor-pointer transition-colors'>
            <div className='flex items-center justify-center bg-red-500 dark:bg-red-600 rounded-l-lg w-12 min-w-12'>
                <FiAlertTriangle className="text-lg text-white" />
            </div>
            <div className='flex-1 bg-white dark:bg-gray-800 rounded-r-lg p-1'>
                <div className='font-bold text-xs text-red-600 dark:text-red-400 truncate'>
                    Critical Alert
                </div>
                <div className='text-xs text-gray-600 dark:text-gray-300 truncate'>
                    High consumption Zone 5
                </div>
            </div>
        </div>
    )
}