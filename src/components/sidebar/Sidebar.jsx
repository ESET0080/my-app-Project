import React from 'react'
import { Link, useLocation } from 'react-router-dom'

export default function Sidebar() {
  const location = useLocation()

  const menuItems = [
    { path: '/Home', label: 'Dashboard'},
    { path: '/Bills', label: 'Bills & Payments'},
    { path: '/Alerts', label: 'Alerts & Notifications'},
    { path: '/Profile', label: 'Profile & Settings'},
    { path: '/DashBoard', label: 'DashBoard'},
    { path: '/Settings', label: 'Security & Notifications'},
    { path: '/MeterManagement', label: 'Meter Management'},
    { path: '/UserManagement', label: 'User Management'},
    { path: '/Reports', label: 'Reports'},
    { path: '/EnterpriseDashBoard', label: 'DashBoard'}
  ]

  return (
    <div className="p-4 ">
      <nav>
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={`flex items-center px-4 py-3 rounded-lg transition duration-200 ${
                  location.pathname === item.path
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-700 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-700'
                }`}
              >
                <span className="mr-3">{item.icon}</span>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}