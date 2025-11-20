import React from 'react'

const Input = ({ 
  type = 'text', 
  placeholder, 
  value, 
  onChange, 
  className = '', 
  ...props 
}) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`w-full px-4 py-2 bg-gray-300 border-0 rounded-2xl focus:outline-none focus:ring-2 
      focus:ring-blue-500 focus:bg-white ${className}`}
      {...props}
    />
  )
}

export default Input