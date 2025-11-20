import React from 'react'
import { IoMdNotificationsOutline } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import ToggleDarkButton from '../button/ToggleDarkButton';
import Button from '../button/Button';

export default function Navbar() {
  return (
    <div className="bg-gray-300 h-full flex items-center justify-between px-4 dark:bg-gray-900">
      <div className="text-xl font-bold dark:text-white">
        MDMS
      </div>
      <div className='flex justify-between items-center p-4 gap-6'>
        <div>
          <ToggleDarkButton/>
        </div>
        <div>
          <button className="bg-transparent px-3 py-1 rounded-xl border-2 border-black dark:text-white dark:border-white">
          en ▼
        </button>
        </div>
 
        

      </div>

    </div>
  )
}