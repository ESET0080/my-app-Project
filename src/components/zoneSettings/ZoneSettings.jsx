import React, { useState } from 'react'
import Slider from '../slider/Slider'
import Input2 from '../input_form/Input2'
import Button from '../button/Button';

export default function ZoneSettings() {
    const [formData, setFormData] = useState({
        name: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <div className='mb-8'>
            <div className='justify-items-start mb-6'>
                <h2 className='font-bold text-2xl dark:text-white'>Alert Thresholds</h2>
            </div>
            <div className='justify-items-start'>
                <h2 className='text-xl dark:text-gray-300'>Set consumption limits that trigger automatic alerts for meters in your zone.</h2>
            </div>
            <div className='mt-8 flex justify-between'>
                <Slider title="High Consumption Threshold (kWh)" max={1000} />
                <Slider title="Low Consumption Threshold (kWh)" max={1000}/>
            </div>
            <div className='mt-8 flex justify-between'>
                <Slider title="Abnormal Reading Frequency (hours)"  max={10}/>
                {/* Input wrapped in same size card as Slider */}
                <div className="w-full max-w-md mx-auto p-6 bg-white  rounded-lg shadow-sm border border-gray-200 ">
                    <div className='text-lg font-semibold text-gray-800  mb-8'>
                        Inactive Meters Duration (days)
                    </div>
                    <Input2
                        label="day"
                        type="text"
                        name="name"
                        placeholder="Sunday"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full"
                    />
                </div>
            </div>

            {/* Centered Button */}
            <div className="flex justify-center mt-8">
                <div className="w-full max-w-md flex justify-center">
                    <Button
                        //onClick={handleSave}
                        className='border-2 bg-black dark:bg-gray-500 text-white dark:text-white rounded-2xl px-12 py-2 w-[60%] hover:bg-gray-800 dark:hover:bg-gray-600 transition-colors'
                    >
                        Save & Continue
                    </Button>
                </div>
            </div>
        </div>
    )
}