import { useTasks } from '../context/TaskContext';
import GaugeChart from 'react-gauge-chart';

const TaskStatisticsCard = () => {
  const { statistics, theme } = useTasks();

  const completionPercentage = statistics.completed / (statistics.completed + statistics.pending);

  const getArcGradient = (percentage) => {
    if (percentage <= 0.4) return "url(#redGradient)"; // Gradient for 0–40%
    if (percentage <= 0.7) return "url(#yellowGradient)"; // Gradient for 41–70%
    return "url(#greenGradient)"; // Gradient for 71–100%
  };

  return (
    <div className="bg-white dark:bg-[#1e293b] p-6 rounded-lg shadow-md transition-colors duration-300">
      <h2 className="text-lg font-semibold mb-4">Task Progress</h2>
      <div className="flex flex-col items-center">
        <svg width="0" height="0">
          <defs>
            <linearGradient id="redGradient" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#FF7F7F" />
              <stop offset="100%" stopColor="#FF0000" />
            </linearGradient>
            <linearGradient id="yellowGradient" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#FFFF99" />
              <stop offset="100%" stopColor="#FFFF00" />
            </linearGradient>
            <linearGradient id="greenGradient" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#99FF99" />
              <stop offset="100%" stopColor="#00FF00" />
            </linearGradient>
          </defs>
        </svg>
        <GaugeChart
          id="task-completion-gauge"
          nrOfLevels={100} // High number of levels for smoothness
          arcsLength={[completionPercentage, 1 - completionPercentage]} // Divide into filled and unfilled segments
          colors={[getArcGradient(completionPercentage), "#e5e7eb"]} // Gradient fill color and gray for unfilled arc
          percent={completionPercentage}
          arcWidth={0.3}
          needleColor={theme === 'dark' ? '#00FFFF' : '#000000'} // Cyan needle for dark mode, black for light mode
          textColor={theme === 'dark' ? '#FFFFFF' : '#000000'} // White text for dark mode, black for light mode
          style={{
            width: '100%',
            textShadow: theme === 'dark' ? '0px 0px 3px #000' : 'none', // Enhanced text shadow for dark mode
            fontWeight: 'bold', // Bold text for better visibility
          }}
          formatTextValue={() => `${Math.round(completionPercentage * 100)}%`} // Round off the percentage in the center and add % symbol
        />
      </div>
    </div>
  );
};

export default TaskStatisticsCard;