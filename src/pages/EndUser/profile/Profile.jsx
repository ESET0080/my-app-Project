import React from 'react'

import Tab from '../../../components/tab/Tab'

export default function Profile() {
    return (
        <div className='mb-8'>
            <div className='justify-items-start'>
                <h2 className='font-bold text-2xl dark:text-white'>Profile & Settings</h2>

            </div>
            <div className='mt-8'>
                <Tab/>
            </div>

        </div>
    )
}
