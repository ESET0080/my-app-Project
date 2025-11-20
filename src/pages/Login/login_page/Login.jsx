import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Input from '../../../components/input_form/Input'
import Button from '../../../components/button/Button'

export default function Login({ onLogin }) {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const handleLogin = () => {
    if (formData.email === "abc@gmail.com" && formData.password === "0000") {
      onLogin() // Triggers layout change in App.jsx
      navigate('/Home')
    } else {
      alert('Invalid email or password')
    }
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }



  return (
    <div className="min-h-screen flex items-center justify-center p-8 dark:bg-gray-800 bg-white">
      <div className="w-full max-w-md p-8 bg-white dark:bg-gray-600 rounded-2xl  dark:border-gray-700">
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-800 dark:text-white">
          Login Form
        </h1>

        <div className="space-y-4">
          <Input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
          />

          <Input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
          />

          <div className="flex justify-between items-center py-2">
            <div className="flex items-center">
              <input 
                type="checkbox" 
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600" 
              />
              <label className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                Remember Me
              </label>
            </div>
            <div>
              <Link 
                to="/Forgot_Password" 
                className="text-sm text-blue-500 hover:text-blue-700 hover:underline dark:text-blue-400 dark:hover:text-blue-300"
              >
                Forgot Password?
              </Link>
            </div>
          </div>

          <Button
            onClick={handleLogin}
            className="w-[80%] bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 dark:bg-blue-600 dark:hover:bg-blue-700"
          >
            Login
          </Button>
        </div>

        
      </div>
    </div>
  );
}