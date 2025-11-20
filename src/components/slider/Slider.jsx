import React, { useState, useRef, useCallback } from 'react';

const Slider = ({ title, max = 1000 }) => {
    const [value, setValue] = useState(Math.floor(max / 2)); // Default middle value
    const [isDragging, setIsDragging] = useState(false);
    const sliderRef = useRef(null);
    const min = 0;

    // Calculate percentage for positioning
    const percentage = ((value - min) / (max - min)) * 100;

    // Generate exactly 10 equal parts based on max value
    const points = [];
    const step = max / 10;
    for (let i = 0; i <= 10; i++) {
        points.push(Math.round(min + (step * i)));
    }

    // Handle slider drag - ONLY for thumb
    const handleThumbMouseDown = useCallback((e) => {
        e.stopPropagation(); // Prevent event from bubbling to track
        setIsDragging(true);
    }, []);

    const handleMouseMove = useCallback((e) => {
        if (isDragging) {
            updateValueFromEvent(e);
        }
    }, [isDragging]);

    const handleMouseUp = useCallback(() => {
        setIsDragging(false);
    }, []);

    const updateValueFromEvent = (e) => {
        if (!sliderRef.current) return;

        const rect = sliderRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const percentage = Math.max(0, Math.min(1, x / rect.width));
        const newValue = Math.round(min + percentage * (max - min));

        setValue(newValue);
    };

    // Add event listeners for drag
    React.useEffect(() => {
        if (isDragging) {
            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleMouseUp);

            return () => {
                document.removeEventListener('mousemove', handleMouseMove);
                document.removeEventListener('mouseup', handleMouseUp);
            };
        }
    }, [isDragging, handleMouseMove, handleMouseUp]);

    return (
        <div className="w-full max-w-md mx-auto p-6 bg-white rounded-lg">
            <h2 className="text-lg font-semibold text-gray-800 mb-6">
                {title}
            </h2>

            {/* Slider Container */}
            <div className="relative mb-8">
                {/* Track */}
                <div
                    ref={sliderRef}
                    className="h-5 bg-violet-200 rounded-full cursor-pointer relative"
                >
                    {/* Filled Track */}
                    <div
                        className="absolute h-5 bg-violet-900 rounded-full"
                        style={{ width: `${percentage}%` }}
                    />

                    {/* Points for 10 equal parts based on max */}
                    {points.map((point) => {
                        const pointPercentage = ((point - min) / (max - min)) * 100;
                        const isOnDarkSide = pointPercentage <= percentage;
                        
                        return (
                            <div
                                key={point}
                                className={`absolute w-2 h-2 rounded-full border border-violet-400 transform -translate-x-1 -translate-y-1 ${
                                    isOnDarkSide ? 'bg-violet-200' : 'bg-violet-900'
                                }`}
                                style={{
                                    left: `${pointPercentage}%`,
                                    top: '50%'
                                }}
                            />
                        );
                    })}

                    {/* Thumb */}
                    <div
                        className={`absolute w-4 h-12 bg-white rounded-full shadow-lg cursor-grab ${
                            isDragging ? 'cursor-grabbing scale-110' : ''
                        } transition-transform duration-150 flex items-center justify-center z-10`}
                        style={{
                            left: `calc(${percentage}% - 0.5rem)`,
                            top: '50%',
                            transform: 'translateY(-50%)'
                        }}
                        onMouseDown={handleThumbMouseDown}
                    >
                        {/* Inner violet thumb */}
                        <div className="w-2 h-10 bg-violet-900 rounded-full" />
                    </div>
                </div>

                {/* Min/Max Labels */}
                <div className="flex justify-between mt-2 text-sm text-gray-600">
                    <span>{min}</span>
                    <span>{max}</span>
                </div>
            </div>

            {/* Current Value Display */}
            <div className="text-center">
                <div className="inline-block px-4 py-2 bg-gray-100 rounded-lg">
                    <span className="text-2xl font-bold text-gray-800">{value}</span>
                    <span className="text-sm text-gray-600 ml-1">kWh</span>
                </div>
            </div>
        </div>
    );
};

export default Slider;