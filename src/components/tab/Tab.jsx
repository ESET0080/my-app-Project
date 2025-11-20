import React from 'react'
import { useState } from 'react';
import Profile from '../profile/Profile';
import Security from '../security/Security';
import NotificationSettings from '../notification_settings/NotificationSettings';

export default function Tab() {
  const [activeTab, setActiveTab] = useState('profile');

    const tabClasses = (tabName) => 
        `flex-1 text-center cursor-pointer transition-all duration-300 py-3 ${
            activeTab === tabName 
                ? 'text-violet-600 font-bold border-b-2 border-violet-600' 
                : 'text-gray-600 hover:text-violet-500'
        }`;

    return (
        <div className='mt-8'>
            
            <div className='flex justify-between border-b-2 border-gray-300'>
                <div 
                    className={tabClasses('profile')}
                    onClick={() => setActiveTab('profile')}
                >
                    <h3 className='text-lg font-semibold'>Profile</h3>
                </div>
                <div 
                    className={tabClasses('security')}
                    onClick={() => setActiveTab('security')}
                >
                    <h3 className='text-lg font-semibold'>Security</h3>
                </div>
                <div 
                    className={tabClasses('notifications')}
                    onClick={() => setActiveTab('notifications')}
                >
                    <h3 className='text-lg font-semibold'>Notifications</h3>
                </div>
            </div>

            
            <div className='w-full mt-6'>
                {activeTab === 'profile' && (
                    <Profile/>
                )}

                {activeTab === 'security' && (
                    <Security/>
                )}

                {activeTab === 'notifications' && (
                    <NotificationSettings/>
                )}
            </div>
        </div>
    );
}
