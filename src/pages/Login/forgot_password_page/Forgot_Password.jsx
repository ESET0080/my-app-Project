import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Input from '../../../components/input_form/Input'
import Button from '../../../components/button/Button'

export default function Forgot_Password() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')

  const handleResetLink = () => {
    // Reset password logic
    
    
    // Navigate to Reset_Password page
    navigate('/Reset_Password')
  }

  const handleEmailChange = (e) => {
    setEmail(e.target.value)
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-8 dark:bg-gray-800 bg-white">
      <div className="w-full max-w-md p-8 bg-white dark:bg-gray-600 rounded-2xl  dark:border-gray-700">
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-800 dark:text-white">
          Forgot Password
        </h1>

        <div className="space-y-4">
          <Input
            type="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={handleEmailChange}
            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
          />

          <div className="flex justify-between items-center py-2">
            <div>
              <Link 
                to="/" 
                className="text-sm text-blue-500 hover:text-blue-700 hover:underline dark:text-blue-400 dark:hover:text-blue-300"
              >
                Login
              </Link>
            </div>
          </div>

          <div className="flex justify-center">
            <Button
              onClick={handleResetLink}
              className="w-[80%] bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 dark:bg-blue-600 dark:hover:bg-blue-700"
            >
              Send Reset Link
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}