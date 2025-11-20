import React from 'react'
import Tab2 from '../../../components/tab/Tab2'

export default function Settings() {
    return (
        <div className='mb-8'>
            <div className='justify-items-start mb-6'>
                <h2 className='font-bold text-2xl dark:text-white'>User Management</h2>
            </div>
            <div className='justify-items-start'>
                <h2 className='text-xl dark:text-gray-300'>Manage your alert rules and communication preferences</h2>
            </div>
            <div className='mt-8'>
                <Tab2/>
            </div>
        </div>
    )
}