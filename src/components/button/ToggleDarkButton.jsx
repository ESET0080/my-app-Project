import { useState, useEffect } from 'react';

const ToggleDarkButton = () => {
  const [isOn, setIsOn] = useState(false);

 
  useEffect(() => {
    if (isOn) {
      document.documentElement.classList.add('dark');
    
      sessionStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
     
      sessionStorage.setItem('theme', 'light');
    }
  }, [isOn]);


  useEffect(() => {
    const savedTheme = sessionStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setIsOn(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  return (
    <button
      onClick={() => setIsOn(!isOn)}
      className={`
        relative inline-flex h-6 w-11 items-center rounded-full
        transition-colors duration-300 ease-in-out
        border-2 border-black dark:border-white
        ${isOn ? 'bg-white-500' : 'bg-gray-300'}
      `}
    >
      <span
        className={`
          inline-block h-4 w-4 transform rounded-full bg-black dark:bg-white shadow-lg
          transition-transform duration-300 ease-in-out
          ${isOn ? 'translate-x-6' : 'translate-x-1'}
        `}
      />
    </button>
  );
};

export default ToggleDarkButton;