import { useTasks } from '../context/TaskContext';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

const TaskStatisticsCard = () => {
  const { statistics } = useTasks();

  const data = [
    { name: 'Completed', value: statistics.completed },
    { name: 'Pending', value: statistics.pending },
  ];

  const COLORS = ['#0088FE', '#FF8042'];

  return (
    <div className="bg-white dark:bg-[#1e293b] p-6 rounded-lg shadow-md transition-colors duration-300">
      <h2 className="text-lg font-semibold mb-4">Task Statistics</h2>
      <ResponsiveContainer width="100%" height={200}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={80}
            fill="#8884d8"
          >
            {data.map((_, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TaskStatisticsCard;