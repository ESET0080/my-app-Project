import React from 'react'
import Button from '../../../components/button/Button'
import LineCharts from '../../../chart/LineChart'
import { TbActivityHeartbeat } from "react-icons/tb";
import { FiAlertOctagon } from "react-icons/fi";
import { FaArrowTrendUp } from "react-icons/fa6";

export default function DashBoard() {
  return (
    <div className="px-8 py-6 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white min-h-screen">

      <div className='flex items-center justify-between'>
        <div className='text-2xl font-bold mb-4 dark:text-white'> Zone Dashboard </div>
      </div>

      <div className='flex items-center justify-between my-8 gap-6'>
        <div className='text-2xl font-bold border-2 border-gray-500 dark:border-gray-600 p-8 rounded-xl w-80 h-60 flex flex-col items-center justify-center bg-white dark:bg-gray-800'>
          <div className="mb-4 w-12 h-12 flex items-center justify-center text-blue-500 dark:text-blue-400">
            <TbActivityHeartbeat className="w-8 h-8" />
          </div>
          <div className='text-3xl dark:text-white'>256</div>
          <div className='text-lg mt-2 dark:text-gray-300'><h2>Active Meters</h2></div>
        </div>
        <div className='text-2xl font-bold border-2 border-gray-500 dark:border-gray-600 p-8 rounded-xl w-80 h-60 flex flex-col items-center justify-center bg-white dark:bg-gray-800'>
          <div className="mb-4 w-12 h-12 flex items-center justify-center text-blue-500 dark:text-blue-400">
            <FaArrowTrendUp className="w-8 h-8" />
          </div>
          <div className='text-3xl dark:text-white'>55%</div>
          <div className='text-lg mt-2 dark:text-gray-300'><h2>Avg Usage</h2></div>
        </div>
        <div className='text-2xl font-bold border-2 border-gray-500 dark:border-gray-600 p-8 rounded-xl w-80 h-60 flex flex-col items-center justify-center bg-white dark:bg-gray-800'>
          <div className="mb-4 w-12 h-12 flex items-center justify-center text-blue-500 dark:text-blue-400">
            <FiAlertOctagon className="w-8 h-8" />
          </div>
          <div className='text-3xl dark:text-white'>26</div>
          <div className='text-lg mt-2 dark:text-gray-300'><h2>Pending Alert</h2></div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md dark:shadow-gray-700/30 p-6 my-8">
        <div className="flex justify-between items-center mb-6">
          <div className="font-bold text-xl text-gray-800 dark:text-white">
            Analytics Chart
          </div>
          <div className="flex border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden">
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
            <LineCharts width={1000} height={400} />
          </div>
        </div>
      </div>

      <div className='flex gap-6'>
        <Button className='border-2 border-black dark:border-gray-400 rounded-2xl px-3 py-2 w-48 bg-white dark:bg-gray-800 text-black dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700'>
          Add meter
        </Button>
        <Button className='border-2 border-black dark:border-gray-400 rounded-2xl px-3 py-2 w-48 bg-white dark:bg-gray-800 text-black dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700'>
          Generate Report
        </Button>
      </div>
    </div>
  )
}