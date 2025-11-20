// components/Layout/Layout.jsx
import React from 'react'
import Navbar from '../navbar/Navbar'
import Sidebar from '../sidebar/Sidebar'
import LoggedNavbar from '../navbar/LoggedNavbar'

export default function Layout({ children }) {
  return (
    <div className="h-screen w-full flex flex-col">
      <div className="h-[10%] w-full">
        <LoggedNavbar />
      </div>

      <div className="h-[90%] w-full flex">
       
        <div className="w-1/5 bg-gray-100 border-r border-gray-300 dark:bg-gray-800">
          <Sidebar />
        </div>

        
        <div className="w-4/5 p-6 overflow-auto">
          {children}
        </div>
      </div>
    </div>
  )
}