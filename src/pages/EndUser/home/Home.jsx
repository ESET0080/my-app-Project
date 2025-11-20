import React from 'react'
import Button from '../../../components/button/Button'
import LineCharts from '../../../chart/LineChart'
import { FaRegClock } from "react-icons/fa6";

export default function Home() {
  return (
    <div className="px-8 py-6 bg-white dark:bg-gray-700 text-gray-900 dark:text-white min-h-screen">

      <div className='flex items-center justify-between'>
        <div>
          <div className='text-2xl font-bold mb-4'> Welcome , XYZ </div>
          <div className='mb-1 dark:text-gray-300'>As of Oct 5, 2025</div>
          <div className='dark:text-gray-300'>Zone : Bangalore North</div>
        </div>

        <div className='text-right'>
          <div className='mb-1 dark:text-gray-300'> Last Synced at 10:45 AM </div>
          <div className='dark:text-gray-300'>Data Source: Smart Meter #1023</div>
        </div>
      </div>


      <div className='flex items-center justify-between my-8 gap-6'>
        <div className='text-2xl font-bold border-2 border-gray-500 dark:border-gray-600 p-8 rounded-xl w-80 h-60 flex flex-col items-center justify-center bg-white dark:bg-gray-800'>
          <div className="mb-4 w-12 h-12 flex items-center justify-center text-blue-500 dark:text-blue-400">
            <FaRegClock className="w-8 h-8" />
          </div>
          <div className='text-3xl dark:text-white'>256kWh</div>
        </div>
        <div className='text-2xl font-bold border-2 border-gray-500 dark:border-gray-600 p-8 rounded-xl w-80 h-60 flex flex-col items-center justify-center bg-white dark:bg-gray-800'>
          <div className="mb-4 w-12 h-12 flex items-center justify-center text-blue-500 dark:text-blue-400">
            <FaRegClock className="w-8 h-8" />
          </div>
          <div className='text-3xl dark:text-white'>1203 Due on 12 Oct</div>
        </div>
        <div className='text-2xl font-bold border-2 border-gray-500 dark:border-gray-600 p-8 rounded-xl w-80 h-60 flex flex-col items-center justify-center bg-white dark:bg-gray-800'>
          <div className="mb-4 w-12 h-12 flex items-center justify-center text-blue-500 dark:text-blue-400">
            <FaRegClock className="w-8 h-8" />
          </div>
          <div className='text-3xl dark:text-white'>Pending</div>
        </div>
      </div>

      <div className='flex items-center justify-between my-8 gap-6'>
        <div className='text-2xl font-bold border-2 border-gray-500 dark:border-gray-600 p-8 rounded-xl w-80 h-60 flex flex-col items-center justify-center bg-white dark:bg-gray-800'>
          <div className="mb-4 w-12 h-12 flex items-center justify-center text-blue-500 dark:text-blue-400">
            <FaRegClock className="w-8 h-8" />
          </div>
          <div className='text-3xl dark:text-white'>Paid 1200 on 10 Sep</div>
        </div>
      </div>


      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md dark:shadow-gray-700/30 p-6 my-8">
        <div className="flex justify-between items-center mb-6">
          <div className="font-bold text-xl text-gray-800 dark:text-white">
            Electricity Consumption Overview
          </div>
          <div className="flex border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden">
            <button className="px-6 py-2 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 border-r border-gray-300 dark:border-gray-600 text-sm font-medium text-gray-700 dark:text-gray-300">
              Day
            </button>
            <button className="px-6 py-2 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 border-r border-gray-300 dark:border-gray-600 text-sm font-medium text-gray-700 dark:text-gray-300">
              Week
            </button>
            <button className="px-6 py-2 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 text-sm font-medium text-gray-700 dark:text-gray-300">
              Month
            </button>
          </div>
        </div>
        <div className="mt-4">
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 p-4">
            <LineCharts width={800} height={250} />
          </div>
        </div>
      </div>


      <div className='text-xl font-bold mb-4 text-left dark:text-white'> Quick Actions </div>
      <div className='flex justify-between gap-4'>
        <Button className='border-2 border-black dark:border-gray-400 rounded-2xl px-3 py-2 w-48 bg-white dark:bg-gray-800 text-black dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700'>
          Pay Bill
        </Button>
        <Button className='border-2 border-black dark:border-gray-400 rounded-2xl px-3 py-2 w-48 bg-white dark:bg-gray-800 text-black dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700'>
          View Bill History
        </Button>
        <Button className='border-2 border-black dark:border-gray-400 rounded-2xl px-3 py-2 w-48 bg-white dark:bg-gray-800 text-black dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700'>
          View Detailed Usage
        </Button>
        <Button className='border-2 border-black dark:border-gray-400 rounded-2xl px-3 py-2 w-48 bg-white dark:bg-gray-800 text-black dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700'>
          Manage Notifications
        </Button>
      </div>
    </div >
  )
}