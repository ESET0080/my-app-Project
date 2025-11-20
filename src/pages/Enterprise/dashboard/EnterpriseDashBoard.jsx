import React from 'react'
import Button from '../../../components/button/Button'
import LineCharts from '../../../chart/LineChart'
import { TbActivityHeartbeat } from "react-icons/tb";
import { FiAlertOctagon } from "react-icons/fi";
import { FaArrowTrendUp } from "react-icons/fa6";
import { IoStatsChartSharp } from "react-icons/io5";
import MapComponent from '../../../components/mapComponent/MapComponent';
import AlertCard from '../../../components/alertCard/AlertCard';

export default function EnterpriseDashBoard() {
  return (
    <div className="px-8 py-6 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white min-h-screen">

      <div className='flex items-center justify-between'>
        <div className='text-2xl font-bold mb-4 dark:text-white'> Enterprise Dashboard </div>
      </div>

      <div className='flex items-center justify-between my-8 gap-6'>
        <div className='text-2xl font-bold border-2 border-gray-500 dark:border-gray-600 p-8 rounded-xl w-80 h-60 flex flex-col items-center justify-center bg-white dark:bg-gray-800'>
          <div className="mb-4 w-12 h-12 flex items-center justify-center text-blue-500 dark:text-blue-400">
            
            <IoStatsChartSharp className="w-8 h-8" />
          </div>
          <div className='text-3xl dark:text-white'>256</div>
          <div className='text-lg mt-2 dark:text-gray-300'><h2>Total Zones</h2></div>
        </div>
        <div className='text-2xl font-bold border-2 border-gray-500 dark:border-gray-600 p-8 rounded-xl w-80 h-60 flex flex-col items-center justify-center bg-white dark:bg-gray-800'>
          <div className="mb-4 w-12 h-12 flex items-center justify-center text-blue-500 dark:text-blue-400">
            <FaArrowTrendUp className="w-8 h-8" />
          </div>
          <div className='text-3xl dark:text-white'>55</div>
          <div className='text-lg mt-2 dark:text-gray-300'><h2>Total Meters</h2></div>
        </div>
        <div className='text-2xl font-bold border-2 border-gray-500 dark:border-gray-600 p-8 rounded-xl w-80 h-60 flex flex-col items-center justify-center bg-white dark:bg-gray-800'>
          <div className="mb-4 w-12 h-12 flex items-center justify-center text-blue-500 dark:text-blue-400">
            <FiAlertOctagon className="w-8 h-8" />
          </div>
          <div className='text-3xl dark:text-white'>26</div>
          <div className='text-lg mt-2 dark:text-gray-300'><h2>Critical Alerts</h2></div>
        </div>
      </div>



      <div className='flex items-center justify-between my-8 gap-6'>
        <div className='text-2xl font-bold border-2 border-gray-500 dark:border-gray-600 p-8 rounded-xl w-80 h-60 flex flex-col items-center justify-center bg-white dark:bg-gray-800'>
          <div className="mb-4 w-12 h-12 flex items-center justify-center text-blue-500 dark:text-blue-400">
            <TbActivityHeartbeat className="w-8 h-8" />
          </div>
          <div className='text-3xl dark:text-white'>26%</div>
          <div className='text-lg mt-2 dark:text-gray-300'><h2>Average Consumption per Zone</h2></div>
        </div>
        
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md dark:shadow-gray-700/30 p-6 my-8">
        <div className="flex gap-6 h-[400px]">
          {/* Left Side - Map Component */}
          <div className="flex-1">
            <MapComponent />
          </div>
          
          {/* Right Side - Alert Cards and Details */}
          <div className="flex-1">
            <div className='flex h-full gap-4'>
              {/* Alert Cards List - Narrower */}
              <div className='w-2/6 rounded-2xl bg-gray-200 dark:bg-gray-600 p-4 overflow-y-auto'>
                <div className='font-bold text-lg mb-4 text-gray-800 dark:text-white'>Alerts</div>
                <AlertCard/>
                <AlertCard/>
                <AlertCard/>
                <AlertCard/>
                <AlertCard/>
              </div>
              
              {/* Alert Details - Wider */}
              <div className='w-4/6 rounded-2xl bg-gray-200 dark:bg-gray-600 p-4 text-gray-800 dark:text-white'>
                <div className='flex justify-between mb-4'>
                  <div className='text-xl font-bold dark:text-white'>
                    Alert Details
                  </div>
                  <div className='dark:text-gray-300 text-sm'>
                    <div>05 May, 2025</div>
                    <div>06:15 PM</div>
                  </div>
                </div>
                <div className='dark:text-gray-300 text-sm'>
                  High energy consumption detected in Zone 5. Current usage exceeds threshold by 45%. 
                  Immediate attention required to prevent system overload. 
                  Please check meter readings and consider load distribution.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      
    </div>
  )
}