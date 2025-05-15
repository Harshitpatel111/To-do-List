import React from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { TaskProvider } from './context/TaskContext';
import { UserProvider } from './context/UserContext';
import Header from './components/Header';
import ProfileCard from './components/ProfileCard';
import TaskList from './components/TaskList';
import TaskStatisticsCard from './components/TaskStatisticsCard';
import TaskChartCard from './components/TaskChartCard';
import StatisticsCard from './components/StatisticsCard';

function App() {
  return (
    <ThemeProvider>
      <UserProvider>
        <TaskProvider>
          <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
            <Header />
            <main className="flex justify-center py-6 px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col w-full max-w-7xl space-y-6">
                {/* Profile Information and Tasks at the top in a horizontal row */}
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 w-full">
                  <div className="col-span-1 lg:col-span-1">
                    <ProfileCard className="w-full" />
                  </div>
                  <div className="col-span-1 lg:col-span-3">
                    <TaskList className="w-full" />
                  </div>
                </div>

                {/* Statistics Card and Task Statistics Card side by side */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <StatisticsCard className="w-full" />
                  </div>
                  <div>
                    <TaskStatisticsCard className="w-full" />
                  </div>
                </div>

                {/* Task Chart Bar Graph */}
                <div className="w-full">
                  <TaskChartCard className="w-full" />
                </div>
              </div>
            </main>
            <footer className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 text-center text-sm text-gray-500 dark:text-gray-400">
              &copy; {new Date().getFullYear()} Floww Dashboard. All rights reserved.
            </footer>
          </div>
        </TaskProvider>
      </UserProvider>
    </ThemeProvider>
  );
}

export default App;