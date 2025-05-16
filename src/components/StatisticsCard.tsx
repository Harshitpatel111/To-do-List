import React from 'react';
import { useTasks } from '../context/TaskContext';

interface StatisticsCardProps {
  className?: string;
}

const StatisticsCard: React.FC<StatisticsCardProps> = ({ className }) => {
  const { statistics } = useTasks();

  const progress = (statistics.completed / statistics.total) * 100 || 0;

  return (
    <div className={`bg-white dark:bg-[#1e293b] p-6 rounded-lg shadow-md transition-colors duration-300 h-full flex flex-col justify-between ${className}`}>
      <h2 className="text-2xl font-semibold mb-6">Statistics</h2>
      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 rounded-xl shadow-md bg-gradient-to-r from-blue-500 to-blue-700 text-white hover:shadow-lg transition-shadow duration-300">
          <p className="text-sm">Total Tasks</p>
          <p className="text-2xl font-bold">{statistics.total}</p>
          <div className="mt-2 bg-blue-800 text-blue-100 text-xs px-2 py-1 rounded-full">100%</div>
        </div>
        <div className="p-4 rounded-xl shadow-md bg-gradient-to-r from-green-500 to-green-700 text-white hover:shadow-lg transition-shadow duration-300">
          <p className="text-sm">Completed</p>
          <p className="text-2xl font-bold">{statistics.completed}</p>
          <div className="mt-2 bg-green-800 text-green-100 text-xs px-2 py-1 rounded-full">{progress.toFixed(0)}%</div>
        </div>
        <div className="col-span-2 flex justify-center">
          <div className="p-4 rounded-xl shadow-md bg-gradient-to-r from-yellow-500 to-yellow-700 text-white hover:shadow-lg transition-shadow duration-300 w-full max-w-[calc(50%-0.5rem)]">
            <p className="text-sm">In Progress</p>
            <p className="text-2xl font-bold">{statistics.pending}</p>
            <div className="mt-2 bg-yellow-800 text-yellow-100 text-xs px-2 py-1 rounded-full">{(100 - progress).toFixed(0)}%</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatisticsCard;