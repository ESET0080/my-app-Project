import React, { useState } from 'react';

export default function ZoneConsumption() {
  // Sample data for different zones with additional data
  const zoneData = {
    2025: {
      Mangalore: 85,
      Bejai: 65,
      Pumpwell: 45,
      PVS: 75,
      Kotekar: 30,
      Surathkal: 55,
      Ullal: 40,
      Bantwal: 35
    },
    2024: {
      Mangalore: 80,
      Bejai: 60,
      Pumpwell: 40,
      PVS: 70,
      Kotekar: 25,
      Surathkal: 50,
      Ullal: 35,
      Bantwal: 30
    },
    2023: {
      Mangalore: 75,
      Bejai: 55,
      Pumpwell: 35,
      PVS: 65,
      Kotekar: 20,
      Surathkal: 45,
      Ullal: 30,
      Bantwal: 25
    },
    2022: {
      Mangalore: 70,
      Bejai: 52,
      Pumpwell: 32,
      PVS: 62,
      Kotekar: 18,
      Surathkal: 42,
      Ullal: 28,
      Bantwal: 22
    },
    2021: {
      Mangalore: 65,
      Bejai: 50,
      Pumpwell: 30,
      PVS: 60,
      Kotekar: 16,
      Surathkal: 40,
      Ullal: 26,
      Bantwal: 20
    },
    2020: {
      Mangalore: 62,
      Bejai: 48,
      Pumpwell: 28,
      PVS: 58,
      Kotekar: 14,
      Surathkal: 38,
      Ullal: 24,
      Bantwal: 18
    },
    2019: {
      Mangalore: 58,
      Bejai: 45,
      Pumpwell: 25,
      PVS: 55,
      Kotekar: 12,
      Surathkal: 35,
      Ullal: 22,
      Bantwal: 16
    },
    2018: {
      Mangalore: 55,
      Bejai: 42,
      Pumpwell: 22,
      PVS: 52,
      Kotekar: 10,
      Surathkal: 32,
      Ullal: 20,
      Bantwal: 14
    }
  };

  // Dynamically get all years from zoneData and sort them in descending order
  const availableYears = Object.keys(zoneData).map(Number).sort((a, b) => b - a);
  
  // Set initial state to the most recent year
  const [selectedYear, setSelectedYear] = useState(availableYears[0]);

  const zones = ['Mangalore', 'Bejai', 'Pumpwell', 'PVS', 'Kotekar', 'Surathkal', 'Ullal', 'Bantwal'];
  const currentData = zoneData[selectedYear];
  const barWidthPercentage = 100 / zones.length;

  // Y-axis values - matching the exact values from your screenshot
  const yAxisValues = [0, 20, 40, 60, 80, 100];

  // Function to handle year increment (next year)
  const incrementYear = () => {
    const currentIndex = availableYears.indexOf(selectedYear);
    if (currentIndex > 0) {
      setSelectedYear(availableYears[currentIndex - 1]);
    }
  };

  // Function to handle year decrement (previous year)
  const decrementYear = () => {
    const currentIndex = availableYears.indexOf(selectedYear);
    if (currentIndex < availableYears.length - 1) {
      setSelectedYear(availableYears[currentIndex + 1]);
    }
  };

  // Check if buttons should be disabled
  const isFirstYear = selectedYear === availableYears[0];
  const isLastYear = selectedYear === availableYears[availableYears.length - 1];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md dark:shadow-gray-700/30 p-6 my-8">
      <div className="flex justify-between items-center mb-6">
        <div className="text-xl font-bold text-gray-800 dark:text-white">
          Zone Consumption Comparison
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-600 dark:text-gray-400">Year:</span>
          <div className="flex items-center gap-2">
            {/* Year display */}
            <div className="w-16 text-center text-lg font-semibold text-gray-800 dark:text-white">
              {selectedYear}
            </div>
            
            {/* Arrow buttons container */}
            <div className="flex flex-col gap-0.5">
              {/* Up arrow button - goes to next year (higher number) */}
              <button
                onClick={incrementYear}
                disabled={isFirstYear}
                className="w-7 h-6 flex items-center justify-center bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <svg 
                  className="w-4 h-4 text-gray-600 dark:text-gray-400" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                </svg>
              </button>
              
              {/* Down arrow button - goes to previous year (lower number) */}
              <button
                onClick={decrementYear}
                disabled={isLastYear}
                className="w-7 h-6 flex items-center justify-center bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <svg 
                  className="w-4 h-4 text-gray-600 dark:text-gray-400" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Graph Container */}
      <div className="relative">
        {/* Graph area */}
        <div className="ml-12 border-l border-b border-gray-300 dark:border-gray-600 relative h-64">
          {/* Grid lines - rendered first */}
          {yAxisValues.map((value) => (
            <div 
              key={value}
              className="absolute left-0 right-0 border-t border-gray-200 dark:border-gray-700"
              style={{ 
                bottom: `${(value / 100) * 100}%`,
                height: '1px'
              }}
            />
          ))}

          {/* Y-axis labels - perfectly aligned with grid lines */}
          {yAxisValues.map((value) => (
            <div 
              key={value}
              className="absolute left-0 transform -translate-x-full flex items-center pr-2"
              style={{ 
                bottom: `${(value / 100) * 100}%`,
                marginBottom: value === 100 ? '0' : '-5px' // Perfect alignment adjustment
              }}
            >
              <span className="text-xs text-gray-600 dark:text-gray-400 font-medium whitespace-nowrap">
                {value}
              </span>
            </div>
          ))}

          {/* Bars Container */}
          <div className="absolute bottom-0 left-0 right-0 h-full flex justify-between px-2">
            {zones.map((zone) => (
              <div 
                key={zone} 
                className="flex flex-col items-center justify-end h-full relative" 
                style={{ width: `${barWidthPercentage}%` }}
              >
                {/* Light Gray Background Boundary - Square corners */}
                <div 
                  className="w-12 bg-gray-100 dark:bg-gray-700 absolute"
                  style={{ 
                    height: '100%',
                    top: 0
                  }}
                />
                
                {/* Violet Bar - Enhanced rounded corners */}
                <div 
                  className="w-12 bg-violet-600 relative group cursor-pointer transition-all duration-300 hover:bg-violet-500 z-10"
                  style={{ 
                    height: `${currentData[zone]}%`,
                    minHeight: '2px',
                    borderTopLeftRadius: '10px',
                    borderTopRightRadius: '10px',
                    borderBottomLeftRadius: '0px',
                    borderBottomRightRadius: '0px'
                  }}
                >
                  {/* Value tooltip on hover */}
                  <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-20">
                    {currentData[zone]}%
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Zone labels below the horizontal axis */}
        <div className="ml-12 flex justify-between px-2 mt-2">
          {zones.map((zone) => (
            <div 
              key={zone} 
              className="text-xs text-gray-700 dark:text-gray-300 font-medium text-center truncate"
              style={{ width: `${barWidthPercentage}%` }}
              title={zone}
            >
              {zone}
            </div>
          ))}
        </div>

        {/* Year label */}
        <div className="text-center mt-6 text-sm text-gray-600 dark:text-gray-400 font-medium">
          {selectedYear}
        </div>
      </div>

      {/* Legend */}
      <div className="mt-6 flex justify-center">
        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
          <div className="w-3 h-3 bg-violet-600 rounded"></div>
          <span>Energy Consumption (%)</span>
        </div>
      </div>
    </div>
  );
}