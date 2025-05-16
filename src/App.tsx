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
  const backgroundImageUrl = "https://example.com/scenic-beach.jpg"; // Replace with your desired image URL

  return (
    <ThemeProvider>
      <UserProvider>
        <TaskProvider>
          <div
            className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300"
            style={{
              backgroundImage: `url(${backgroundImageUrl})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          >
            <Header />
            <main className="flex justify-center py-6 px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 gap-6 w-full max-w-7xl">
                {/* Profile Information and Tasks */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <ProfileCard className="w-full max-w-sm mx-auto" />
                  <TaskList className="w-full md:col-span-2 lg:col-span-3" />
                </div>

                {/* Statistics Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <StatisticsCard className="w-full p-6 rounded-lg shadow-md" />
                  <TaskStatisticsCard className="w-full p-6 rounded-lg shadow-md" />
                </div>

                {/* Task Chart */}
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