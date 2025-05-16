import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useTasks } from '../context/TaskContext';

interface TaskChartCardProps {
  className?: string;
}

const TaskChartCard: React.FC<TaskChartCardProps> = ({ className }) => {
  const { statistics } = useTasks();

  const data = [
    { name: 'Total', value: statistics.total },
    { name: 'Completed', value: statistics.completed },
    { name: 'Pending', value: statistics.pending },
  ];

  return (
    <div className={`bg-white dark:bg-[#1e293b] p-6 rounded-lg shadow-md transition-colors duration-300 ${className}`}>
      <h2 className="text-lg font-semibold mb-4">Task Chart</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="value" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TaskChartCard;