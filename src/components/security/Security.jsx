import React, { useState } from 'react';
import { GoPencil } from "react-icons/go";
import Button from '../button/Button';
import Input2 from '../input_form/Input2'; // Changed to Input2
import { FaRegUser } from 'react-icons/fa';

export default function Security() {
    const [formData, setFormData] = useState({
        current_password: '',
        new_password: '',
        confirm_password: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <div className="flex flex-col items-center p-8">

            <div className="relative inline-block mb-8">
                <div className="flex justify-center items-center w-24 h-24 bg-gray-800 dark:bg-gray-500 rounded-full">
                    <FaRegUser className="text-7xl text-white" />
                </div>

            </div>


            <div className="w-full max-w-md">
                <Input2
                    label="Current Password"
                    type="password"
                    name="current_password"
                    value={formData.current_password}
                    onChange={handleChange}
                    className="w-[60%]"
                />

                <Input2
                    label="New Password"
                    type="password"
                    name="new_password"
                    value={formData.new_password}
                    onChange={handleChange}
                    className="w-[60%]"
                />

                <Input2
                    label="Confirm Password"
                    type="password"
                    name="confirm_password"
                    value={formData.confirm_password}
                    onChange={handleChange}
                    className="w-[60%]"
                />

                <Button
                    //onClick={handleSave}
                    className='border-2 bg-black text-white rounded-2xl px-12 py-2 w-[60%] hover:bg-gray-800 transition-colors mt-4'
                >
                    Save & Continue
                </Button>
            </div>
        </div>
    );
}