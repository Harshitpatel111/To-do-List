import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useUser } from '../context/UserContext';

const Header: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const { user } = useUser();

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      const root = document.documentElement;
      root.style.backgroundImage = `url(${imageUrl})`;
      root.style.backgroundSize = 'cover';
      root.style.backgroundPosition = 'center';
      root.style.backgroundRepeat = 'no-repeat';
      root.style.minHeight = '100vh';
    }
  };

  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm py-4 px-6 transition-all duration-300 ease-in-out relative">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
        <div className="flex items-center space-x-2">
          <img
            src="https://img.icons8.com/?size=100&id=6xRZJrVWQLNn&format=png&color=000000"
            alt="Dashboard Icon"
            className="h-6 w-6"
          />
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">Floww Dashboard</h1>
        </div>
        <div className="flex flex-wrap justify-between items-center space-x-4">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
            id="background-upload"
          />
          <label
            htmlFor="background-upload"
            className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors cursor-pointer"
            title="Upload Background"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 16.5v-9m0 0L9 9m3-1.5l3 1.5m6 9.75a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </label>
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {theme === 'dark' ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </button>
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300 hidden sm:inline-block">
              {user.name}
            </span>
            <img
              src={user.avatar}
              alt={user.name}
              className="h-8 w-8 rounded-full object-cover border border-gray-200 dark:border-gray-700"
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;