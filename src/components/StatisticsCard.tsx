import React from 'react';
import { useTasks } from '../context/TaskContext';

const StatisticsCard = () => {
  const { statistics } = useTasks();

  const progress = (statistics.completed / statistics.total) * 100 || 0;

  return (
    <div className="bg-white dark:bg-[#1e293b] p-6 rounded-lg shadow-md transition-colors duration-300">
      <h2 className="text-lg font-semibold mb-6">Statistics</h2>
      <div className="space-y-6">
        <div className="grid grid-cols-3 gap-4">
          <div className="p-4 rounded-md bg-blue-600 text-white shadow-md flex flex-col items-center">
            <p className="text-sm">Total Tasks</p>
            <p className="text-2xl font-bold">{statistics.total}</p>
            <div className="mt-2 bg-blue-700 text-blue-100 text-xs px-2 py-1 rounded-full">100%</div>
          </div>
          <div className="p-4 rounded-md bg-green-600 text-white shadow-md flex flex-col items-center">
            <p className="text-sm">Completed</p>
            <p className="text-2xl font-bold">{statistics.completed}</p>
            <div className="mt-2 bg-green-700 text-green-100 text-xs px-2 py-1 rounded-full">{progress.toFixed(0)}%</div>
          </div>
          <div className="p-4 rounded-md bg-yellow-600 text-white shadow-md flex flex-col items-center">
            <p className="text-sm">Pending</p>
            <p className="text-2xl font-bold">{statistics.pending}</p>
            <div className="mt-2 bg-yellow-700 text-yellow-100 text-xs px-2 py-1 rounded-full">{(100 - progress).toFixed(0)}%</div>
          </div>
        </div>
        <div>
          <div className="h-2 bg-gray-300 dark:bg-gray-700 rounded-full overflow-hidden">
            <div
              className="h-2 bg-green-500 rounded-full transition-all duration-500 ease-in-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mt-2">
            <span>Progress</span>
            <span>{progress.toFixed(0)}%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatisticsCard;