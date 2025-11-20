import React, { useState } from 'react';

const Input2 = ({
    label,
    type = "text",
    value,
    onChange,
    name,
    placeholder,
    className = "",
    ...props
}) => {
    const [isFocused, setIsFocused] = useState(false);

    return (
        <div className="relative mb-4">
            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                className={`
          w-full p-3 border border-gray-400  rounded-lg 
    focus:outline-none focus:border-violet-500
      dark:focus:border-violet-400
    transition-colors duration-200
          ${className}
        `}
                {...props}
            />
            {label && (
                <label
                    className={`absolute left-3 -top-2 px-1 text-xs font-medium transition-all duration-200 pointer-events-none
            ${value || isFocused
                            ? 'text-violet-400 bg-white  '
                            : 'text-gray-500 bg-white'
                        }
          `}
                >
                    {label}
                </label>
            )}
        </div>
    );
};

export default Input2;