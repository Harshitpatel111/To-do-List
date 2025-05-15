import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useUser } from '../context/UserContext';

const Header: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const { user } = useUser();

  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm py-4 px-6 transition-all duration-300 ease-in-out">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <img
            src="https://img.icons8.com/?size=100&id=6xRZJrVWQLNn&format=png&color=000000"
            alt="Dashboard Icon"
            className="h-6 w-6"
          />
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">Floww Dashboard</h1>
        </div>
        
        <div className="flex items-center space-x-4">
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